import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../../domain/entities/vehicle";

export class FindVehicleByIdUseCase {
    constructor(private vehicleRepository: IVehicleRepository) { }

    async execute(id: string): Promise<Vehicle | null> {
        const vehicle = await this.vehicleRepository.findOneById(id);

        if (!vehicle) {
            throw new Error('Veículo não encontrado!');
        }

        return vehicle;
    }
}