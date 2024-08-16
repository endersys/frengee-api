import swaggerJSDoc from "swagger-jsdoc";

const options  = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Frengee",
            version: "1.0.0",
            description: "Esta API fornece um conjunto completo de endpoints para a gestão de veículos, permitindo a criação, leitura, atualização e exclusão de registros de veículos.",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            schemas: {
                Vehicle: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do veículo",
                            example: "66bfbdd95d10f0c7fe67412a",
                        },
                        make: {
                            type: "string",
                            description: "Marca do veículo",
                            example: "Toyota",
                        },
                        model: {
                            type: "string",
                            description: "Modelo do veículo",
                            example: "Corola",
                        },
                        year: {
                            type: "integer",
                            description: "Ano de fabricação",
                            example: 2001,
                        },
                        plate: {
                            type: "string",
                            description: "Placa do veículo",
                            example: "MYJ-1414",
                        },
                        color: {
                            type: "string",
                            description: "Cor do veículo",
                            example: "Branco",
                        },
                    },
                },
                CreateVehicleDTO: {
                    type: "object",
                    properties: {
                        make: {
                            type: "string",
                            description: "Marca do veículo",
                            example: "Toyota",
                        },
                        model: {
                            type: "string",
                            description: "Modelo do veículo",
                            example: "Corola",
                        },
                        year: {
                            type: "integer",
                            description: "Ano de fabricação",
                            example: 2001,
                        },
                        plate: {
                            type: "string",
                            description: "Placa do veículo",
                            example: "MYJ-1414",
                        },
                        color: {
                            type: "string",
                            description: "Cor do veículo",
                            example: "Branco",
                        },
                    },
                    required: ["make", "model", "year", "plate", "color"],
                },
                UpdateVehicleDTO: {
                    type: "object",
                    properties: {
                        make: {
                            type: "string",
                            description: "Marca do veículo",
                            example: "Toyota",
                        },
                        model: {
                            type: "string",
                            description: "Modelo do veículo",
                            example: "Corola",
                        },
                        year: {
                            type: "integer",
                            description: "Ano de fabricação",
                            example: 2001,
                        },
                        plate: {
                            type: "string",
                            description: "Placa do veículo",
                            example: "MYJ-1414",
                        },
                        color: {
                            type: "string",
                            description: "Cor do veículo",
                            example: "Branco",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/http/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);