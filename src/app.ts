import express from "express";
import dotenv from "dotenv";
import router from "./http/routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', router);

export default app;