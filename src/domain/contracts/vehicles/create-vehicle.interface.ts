import { CreateVehicleDto } from "../../../http/dtos/vehicles/create-vehicle.dto";
import { ListVehiclesDto } from "../../../http/dtos/vehicles/list-vehicles-vehicles.dto";
import { UpdateVehicleDto } from "../../../http/dtos/vehicles/update-vehicle.dto";
import { Vehicle } from "../../entities/vehicle";

export interface IVehicleRepository {
    create(input: CreateVehicleDto): Promise<Vehicle>;
    update(id: string, input: UpdateVehicleDto): Promise<Vehicle>;
    getAll(params: ListVehiclesDto): Promise<Vehicle[]>;
    findOneById(id: string): Promise<Vehicle | null>;
    delete(id: string): Promise<boolean>;
}