import { model, Schema } from "mongoose";
import { Vehicle } from "../../../../../domain/entities/vehicle";

const schema = new Schema<Vehicle>({
    model: { type: String, required: true },
    year:  { type: Number, required: true },
    color:  { type: String, required: true },
    plate:  { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const VehicleSchema = model<Vehicle>('vehicles', schema);