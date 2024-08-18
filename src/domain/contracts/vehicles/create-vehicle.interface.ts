import { IRepository } from "../../../infra/adapters/orm/mongoose/contracts/base-repository.interface";
import { Vehicle } from "../../entities/vehicle";

export interface IVehicleRepository extends IRepository<Vehicle> {}