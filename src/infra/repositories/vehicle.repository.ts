import { ObjectId } from "mongodb";
import { IVehicleRepository } from "../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../domain/entities/vehicle";
import { CreateVehicleDto } from "../../http/dtos/vehicles/create-vehicle.dto";
import { ListVehiclesDto } from "../../http/dtos/vehicles/list-vehicles-vehicles.dto";
import { UpdateVehicleDto } from "../../http/dtos/vehicles/update-vehicle.dto";
import { VehicleSchema } from "../adapters/orm/mongoose/schemas/vehicle";

export class VehicleRepository implements IVehicleRepository {
    async create(data: CreateVehicleDto): Promise<Vehicle> {
        return await VehicleSchema.create(data);
    }

    async getAll(params: ListVehiclesDto): Promise<Vehicle[]> {
        const { per_page, plate } = params;

        const filter: Record<string, unknown> = {};

        if (plate) {
            filter.plate = { $regex: new RegExp(plate, 'i') };
        }

        return await VehicleSchema.find(filter)
            .limit(per_page ?? 25)
            .lean()
            .exec();
    }

    async findOneById(id: string): Promise<Vehicle | null> {
        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        return await VehicleSchema.findOne({ _id: new ObjectId(id) }).lean();
    }

    async update(id: string, input: UpdateVehicleDto): Promise<Vehicle> {
        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        return await VehicleSchema.findOneAndUpdate({ _id: new ObjectId(id) }, input, { new: true }).lean();
    }

    async delete(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        const deletedVehicle = await VehicleSchema.findByIdAndDelete({ _id: new ObjectId(id) });

        return deletedVehicle !== null;
    }
}