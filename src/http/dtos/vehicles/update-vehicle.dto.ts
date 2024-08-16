import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateVehicleDto {
    @IsOptional()
    @IsString({ message: "O modelo do veículo deve ser uma string." })
    model?: string;

    @IsOptional()
    @IsInt({ message: "O ano do veículo deve ser um valor numérico." })
    year?: number;

    @IsOptional()
    @IsString({ message: "A cor do veículo deve ser uma string." })
    color?: string;

    @IsOptional()
    @IsString({ message: "A marca do veículo deve ser uma string." })
    make?: string;

    @IsOptional()
    @IsString({ message: "A placa do veículo deve ser uma string." })
    plate?: string;
}