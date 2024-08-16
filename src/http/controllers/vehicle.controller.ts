import { Request, Response } from "express";
import { CreateVehicleUseCase } from "../../application/use-cases/vehicle/create-vehicle.usecase";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { CreateVehicleDto } from "../dtos/vehicles/create-vehicle.dto";
import { GetAllVehiclesUseCase } from "../../application/use-cases/vehicle/get-all-vehicles.usecase";
import { FindVehicleByIdUseCase } from "../../application/use-cases/vehicle/find-vehicle-by-id.usecase";
import { UpdateVehicleDto } from "../dtos/vehicles/update-vehicle.dto";
import { UpdateVehicleUseCase } from "../../application/use-cases/vehicle/update-vehicle.usecase";
import { DeleteVehicleUseCase } from "../../application/use-cases/vehicle/delete-vehicle.usecase";

export class VehicleController {
    constructor (
        private readonly createVehicleUseCase: CreateVehicleUseCase,
        private readonly updateVehicleUseCase: UpdateVehicleUseCase,
        private readonly getAllVehiclesUseCase: GetAllVehiclesUseCase,
        private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase,
        private readonly deleteVehicleUseCase: DeleteVehicleUseCase
    ) {}

    async getAll(request: Request, response: Response): Promise<Response> {
        const params = request.query;

        const vehicles = await this.getAllVehiclesUseCase.execute(params); 

        return response.status(HttpStatus.OK).json(vehicles);
    }

    async findOneById(request: Request, response: Response): Promise<Response> {
        const vehicleId = request.params.id;

        try {
            const vehicle = await this.findVehicleByIdUseCase.execute(vehicleId); 
    
            return response.status(HttpStatus.OK).json(vehicle);
        } 
        catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Erro inesperado',
                error: error
            });
        }
    }

    async create(request: Request, response: Response): Promise<Response> {
        const payload: CreateVehicleDto = request.body;
        
        try {
            const vehicle = await this.createVehicleUseCase.execute(payload);

            return response.status(HttpStatus.CREATED).json(vehicle);
        } 
        catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Erro inesperado',
                error: error
            });
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const vehicleId = request.params.id;

        const payload: UpdateVehicleDto = request.body;
        
        try {
            const vehicle = await this.updateVehicleUseCase.execute(vehicleId, payload);

            return response.status(HttpStatus.CREATED).json(vehicle);
        } 
        catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Erro inesperado',
                error: error
            });
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const vehicleId = request.params.id;
        
        try {
            await this.deleteVehicleUseCase.execute(vehicleId);

            return response.status(HttpStatus.OK).json({ message: "Veículo deletado com sucesso." });
        } 
        catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Erro inesperado',
                error: error
            });
        }
    }
}