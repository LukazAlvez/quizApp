import express from 'express'

import home from '../controllers/indexController.js';
import { createUser, view, updateUser, findUser } from '../controllers/usersController.js';
import {registerQuiz, quiz, createQuiz, findQuiz} from '../controllers/quizController.js';
import { ranking } from '../controllers/ranking.controller.js';

const routes = express.Router();

// Rota padrão
routes.get('/', view);

//Rota user
routes.post('/create-user', createUser);
routes.post('/update-user', updateUser);
routes.get('/api/users', findUser);

//Rota quiz
routes.get('/register-quiz', registerQuiz);
routes.get('/quiz', quiz);
routes.post('/api/register-quiz', createQuiz);
routes.get('/api/questoes', findQuiz);

//rota ranking
routes.get('/ranking', ranking);

export default routes;
