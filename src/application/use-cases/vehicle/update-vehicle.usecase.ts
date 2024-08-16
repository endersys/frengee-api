import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { UpdateVehicleDto } from "../../../http/dtos/vehicles/update-vehicle.dto";

export class UpdateVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(id: string, updateVehicleDto: UpdateVehicleDto): Promise<void> {
        const updatedVehicle = await this.vehicleRepository.update(id, updateVehicleDto);
        
        if (!updatedVehicle) {
            throw new Error('Veículo não encontrado!');
        }
    }
}