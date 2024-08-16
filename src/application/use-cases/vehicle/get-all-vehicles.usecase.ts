import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../../domain/entities/vehicle";
import { ListVehiclesDto } from "../../../http/dtos/vehicles/list-vehicles-vehicles.dto";

export class GetAllVehiclesUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(params: ListVehiclesDto): Promise<Vehicle[]> {
        return await this.vehicleRepository.getAll(params);
    }
}