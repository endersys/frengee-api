import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class ListVehiclesDto {
    @IsOptional()
    @IsPositive({ message: "O parâmetro (per_page) deve ser um valor numérico positivo" })
    @IsInt({ message: "O parâmetro (per_page) deve ser um valor numérico" })
    @Min(1, { message: "É necessário informar ao menos um item por página" })
    per_page?: number;

    @IsOptional()
    plate?: string;
}