import app from "./app";
import { initConnection } from "./infra/adapters/orm/mongoose/config";

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
    await initConnection();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

bootstrap();