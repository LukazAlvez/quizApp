import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        mongoose.connect(uri)
        console.log('Conectado ao MongoDB');
    }catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
};

