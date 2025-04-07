import { Quiz } from '../models/Quiz.js';


// Rota para exibir o formulário de registro de perguntas
export const registerQuiz = (req, res) => {
    res.sendFile('registerQuiz.html', { root: 'public' });
};


// Rota para exibir perguntas
export const quiz = (req, res) => {
    res.sendFile('../public/quiz.html', { root: 'public' });
};

// buscar perguntas
export const findQuiz = async (req, res) => {
    try {
        const questions = await Quiz.find();
        res.status(200).json(questions);
    }catch (error){
        console.log(error);
        res.status(400).json({error: 'Erro ao buscar as perguntas'});
    }
}

// criar perguntas
export const createQuiz = async (req, res) =>{
    try{
        const question = new Quiz(req.body);

        const saved = await question.save();
        res.status(201).json(saved);
            
    }catch(error){
        console.log(error);
        res.status(400).json({error: 'Erro ao criar a pergunta'});
    }
}
