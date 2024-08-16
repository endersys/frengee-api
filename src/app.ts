import express from "express";
import dotenv from "dotenv";
import router from "./http/routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;