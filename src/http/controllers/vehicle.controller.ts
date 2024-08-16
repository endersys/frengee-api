import { Request, Response } from "express";
import { CreateVehicleUseCase } from "../../application/use-cases/vehicle/create-vehicle.usecase";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { CreateVehicleDto } from "../dtos/vehicles/create-vehicle.dto";
import { GetAllVehiclesUseCase } from "../../application/use-cases/vehicle/get-all-vehicles.usecase";
import { FindVehicleByIdUseCase } from "../../application/use-cases/vehicle/find-vehicle-by-id.usecase";
import { UpdateVehicleDto } from "../dtos/vehicles/update-vehicle.dto";
import { UpdateVehicleUseCase } from "../../application/use-cases/vehicle/update-vehicle.usecase";
import { DeleteVehicleUseCase } from "../../application/use-cases/vehicle/delete-vehicle.usecase";
import { formatVehicleResponse } from "../../application/use-cases/vehicle/utils/format-response.utils";
import { Vehicle } from "../../domain/entities/vehicle";

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Operações relacionadas a veículos
 */
export class VehicleController {
    constructor (
        private readonly createVehicleUseCase: CreateVehicleUseCase,
        private readonly updateVehicleUseCase: UpdateVehicleUseCase,
        private readonly getAllVehiclesUseCase: GetAllVehiclesUseCase,
        private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase,
        private readonly deleteVehicleUseCase: DeleteVehicleUseCase
    ) {}

    /**
     * @swagger
     * /vehicles:
     *   get:
     *     summary: Lista todos os veículos
     *     tags: [Vehicles]
     *     parameters:
     *       - name: per_page
     *         in: query
     *         description: Número de veículos por página
     *         required: false
     *         schema:
     *           type: integer
     *           example: 10
     *       - name: plate
     *         in: query
     *         description: Placa do veículo para filtrar
     *         required: false
     *         schema:
     *           type: string
     *           example: "MYJ-1414"
     *     responses:
     *       200:
     *         description: Lista de veículos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Vehicle'
     */
    async getAll(request: Request, response: Response): Promise<Response> {
        const params = request.query;

        const vehicles = await this.getAllVehiclesUseCase.execute(params); 

        const formatedResponse = vehicles.map((vehicle: Vehicle) => {
            return formatVehicleResponse(vehicle);
        });

        return response.status(HttpStatus.OK).json(formatedResponse);
    }

    /**
     * @swagger
     * /vehicles/{id}:
     *   get:
     *     summary: Retorna um veículo pelo ID
     *     tags: [Vehicles]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do veículo
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Detalhes do veículo
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Vehicle'
     *       404:
     *         description: Veículo não encontrado
     */
    async findOneById(request: Request, response: Response): Promise<Response> {
        const vehicleId = request.params.id;

        try {
            const vehicle = await this.findVehicleByIdUseCase.execute(vehicleId); 

            return response.status(HttpStatus.OK).json(formatVehicleResponse(vehicle));
        } 
        catch (error: any) {
            return response.status(HttpStatus.NOT_FOUND).json({
                message: error.message
            });
        }
    }

    /**
     * @swagger
     * /vehicles:
     *   post:
     *     summary: Cadastra um novo veículo
     *     tags: [Vehicles]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateVehicleDTO'
     *     responses:
     *       201:
     *         description: Veículo cadastrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Vehicle'
     *       400:
     *         description: Erros no cadastro do veículo
     */
    async create(request: Request, response: Response): Promise<Response> {
        const payload: CreateVehicleDto = request.body;
        
        try {
            const vehicle = await this.createVehicleUseCase.execute(payload);

            return response.status(HttpStatus.CREATED).json(vehicle);
        } 
        catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Erro inesperado'
            });
        }
    }

    /**
     * @swagger
     * /vehicles/{id}:
     *   put:
     *     summary: Atualiza um veículo
     *     tags: [Vehicles]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do veículo
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateVehicleDTO'
     *     responses:
     *       204:
     *         description: Veículo atualizado com sucesso
     *       400:
     *         description: Erros ao atualizar veículo
     *       404:
     *         description: Veículo não encontrado
     */
    async update(request: Request, response: Response): Promise<Response> {
        const vehicleId = request.params.id;

        const payload: UpdateVehicleDto = request.body;
        
        try {
            await this.updateVehicleUseCase.execute(vehicleId, payload);

            return response.status(HttpStatus.NO_CONTENT).send();
        } 
        catch (error: any) {
            let statusCode = HttpStatus.BAD_REQUEST;

            if (error.message === "Veículo não encontrado!") {
                statusCode = HttpStatus.NOT_FOUND;
            } 

            return response.status(statusCode).json({
                message: error.message || 'Erro inesperado'
            });
        }
    }

     /**
     * @swagger
     * /vehicles/{id}:
     *   delete:
     *     summary: Remove um veículo pelo ID
     *     tags: [Vehicles]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do veículo
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Veículo removido com sucesso
     *       400:
     *         description: Erro ao remover veículo
     *       404:
     *         description: Veículo não encontrado
     */
    async delete(request: Request, response: Response): Promise<Response> {
        const vehicleId = request.params.id;
        
        try {
            await this.deleteVehicleUseCase.execute(vehicleId);

            return response.status(HttpStatus.NO_CONTENT).send();
        } 
        catch (error: any) {
            let statusCode = HttpStatus.BAD_REQUEST;

            if (error.message === "Veículo não encontrado!") {
                statusCode = HttpStatus.NOT_FOUND;
            } 

            return response.status(statusCode).json({
                message: error.message
            });
        }
    }
}