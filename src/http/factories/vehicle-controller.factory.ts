import { CreateVehicleUseCase } from "../../application/use-cases/vehicle/create-vehicle.usecase";
import { DeleteVehicleUseCase } from "../../application/use-cases/vehicle/delete-vehicle.usecase";
import { FindVehicleByIdUseCase } from "../../application/use-cases/vehicle/find-vehicle-by-id.usecase";
import { GetAllVehiclesUseCase } from "../../application/use-cases/vehicle/get-all-vehicles.usecase";
import { UpdateVehicleUseCase } from "../../application/use-cases/vehicle/update-vehicle.usecase";
import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { VehicleController } from "../controllers/vehicle.controller";

const vehicleRepository = new VehicleRepository();

const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository);

const getAllVehiclesUseCase = new GetAllVehiclesUseCase(vehicleRepository);

const findVehicleByIdUseCase = new FindVehicleByIdUseCase(vehicleRepository);

const updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepository);

const deleteVehicleUseCase = new DeleteVehicleUseCase(vehicleRepository);

export const vehicleController = new VehicleController(
    createVehicleUseCase,
    updateVehicleUseCase,
    getAllVehiclesUseCase,
    findVehicleByIdUseCase,
    deleteVehicleUseCase
);