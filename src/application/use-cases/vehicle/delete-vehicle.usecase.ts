import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";

export class DeleteVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(id: string): Promise<boolean> {
        const result = await this.vehicleRepository.delete(id);

        if (!result) {
            throw new Error('Veículo não encontrado!');
        }

        return result;
    }
}