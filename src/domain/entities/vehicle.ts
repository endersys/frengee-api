import { CreateVehicleDto } from "../../http/dtos/vehicles/create-vehicle.dto";

export class Vehicle {
	public readonly _id?: string | number;
	public model: string;
	public year: number;
	public color: string;
	public make: string;
	public plate: string;
	public createdAt?: Date;

	constructor(props: CreateVehicleDto) {
		Object.assign(this, props);
	}
}