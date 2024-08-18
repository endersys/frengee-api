import { IVehicleRepository } from "../../../domain/contracts/vehicles/create-vehicle.interface";
import { Vehicle } from "../../../domain/entities/vehicle";
import { ListVehiclesDto } from "../../../http/dtos/vehicles/list-vehicles-vehicles.dto";

export class GetAllVehiclesUseCase {
    constructor(private vehicleRepository: IVehicleRepository) {}

    async execute(params: ListVehiclesDto): Promise<Vehicle[]> {
        const { per_page, plate, sort_direction = 'asc', sort_field = 'createdAt' } = params;

        const filters: Record<string, unknown> = {};
        const sortOptions: Record<string, number> = {};

        if (plate) {
            filters.plate = { $regex: new RegExp(plate, 'i') };
        }

        sortOptions[sort_field] = sort_direction === 'asc' ? 1 : -1;

        return await this.vehicleRepository.getAll(filters, per_page, sortOptions);
    }
}