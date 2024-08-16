import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
    environment: process.env.APP_ENV,
    mongoDbUrl: process.env.MONGO_URI,
};