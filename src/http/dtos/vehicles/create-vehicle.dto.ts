import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleDto {
    @IsNotEmpty({ message: "O modelo do veículo é obrigatório"})
    @IsString({ message: "O modelo do veículo deve ser uma string." })
    model!: string;

    @IsNotEmpty({ message: "O ano do veículo é obrigatório"})
    @IsInt({ message: "O ano do veículo deve ser um valor numérico." })
    year!: number;

    @IsNotEmpty({ message: "A cor do veículo é obrigatória"})
    @IsString({ message: "A cor do veículo deve ser uma string." })
    color!: string;

    @IsNotEmpty({ message: "A marca do veículo é obrigatória"})
    @IsString({ message: "A marca do veículo deve ser uma string." })
    make!: string;

    @IsNotEmpty({ message: "A placa do veículo é obrigatória"})
    @IsString({ message: "A placa do veículo deve ser uma string." })
    plate!: string;
}