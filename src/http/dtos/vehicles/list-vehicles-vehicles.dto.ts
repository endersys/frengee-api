import { IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { TVehicle } from "../../../@types/vehicle";

export class ListVehiclesDto {
    @IsOptional()
    @IsPositive({ message: "O parâmetro (per_page) deve ser um valor numérico positivo" })
    @IsInt({ message: "O parâmetro (per_page) deve ser um valor numérico" })
    @Min(1, { message: "É necessário informar ao menos um item por página" })
    per_page?: number;

    @IsOptional()
    @IsString({ message: 'O parâmetro plate deve ser uma string' })
    plate?: string;

    @IsOptional()
    sort_field?: keyof TVehicle;

    @IsOptional()
    sort_direction?: 'asc' | 'desc';
}