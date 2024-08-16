import mongoose from "mongoose";

export async function initConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Conexão com o MongoDB efetuada com sucesso');
    }
    catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        
        process.exit(1);
    }
};