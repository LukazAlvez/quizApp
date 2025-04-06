import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import serverConfig from './config/serverConfig.js';

//verificar conexão com o banco de dados
import {connectDB} from './config/databaseConfig.js';
connectDB();


const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rotas
app.use('/', routes);

// Inicializa servidor
const PORT = serverConfig;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});