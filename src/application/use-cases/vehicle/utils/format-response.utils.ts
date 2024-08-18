import { Vehicle } from "../../../../domain/entities/vehicle";
import { formatDate } from "../../../../shared/utils/format-date.utils";
import { sanitizeResponse } from "../../../../shared/utils/sanitize-response.utils";

type PlainVehicle = Vehicle & { __v?: string | number };

export function formatVehicleResponse(vehicle: PlainVehicle): Vehicle {
    if (!vehicle) {
        return vehicle;
    }
    
    const plainVehicle = sanitizeResponse({
        ...vehicle,
        created_at_for_humans: formatDate(vehicle.createdAt) 
    }, ['__v']) as Vehicle;

    return plainVehicle;
}