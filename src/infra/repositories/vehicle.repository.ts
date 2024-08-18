import { Vehicle } from "../../domain/entities/vehicle";
import { VehicleSchema } from "../adapters/orm/mongoose/schemas/vehicle";
import { MongooseGenericRepository } from "../adapters/orm/mongoose/contracts/mongoose-generic-repository";

export class VehicleRepository extends MongooseGenericRepository<Vehicle> {
    constructor () {
        super(VehicleSchema)
    }
}