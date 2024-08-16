import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../../domain/entities/vehicle";
import { UpdateVehicleDto } from "../../../http/dtos/vehicles/update-vehicle.dto";
import { formatVehicleResponse } from "./utils/format-response.utils";

export class UpdateVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.update(id, updateVehicleDto);
        
        if (!vehicle) {
            throw new Error('Veículo não encontrado!');
        }

        return formatVehicleResponse(vehicle);
    }
}