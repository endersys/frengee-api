import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../../domain/entities/vehicle";
import { ListVehiclesDto } from "../../../http/dtos/vehicles/list-vehicles-vehicles.dto";
import { formatVehicleResponse } from "./utils/format-response.utils";

export class GetAllVehiclesUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(params: ListVehiclesDto): Promise<Vehicle[]> {
        const vehicles = await this.vehicleRepository.getAll(params);
        
        return vehicles.map((vehicle: Vehicle) => {
            return formatVehicleResponse(vehicle);
        });
    }
}