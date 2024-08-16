import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../../domain/entities/vehicle";
import { CreateVehicleDto } from "../../../http/dtos/vehicles/create-vehicle.dto";

export class CreateVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        return await this.vehicleRepository.create(createVehicleDto);
    }
}