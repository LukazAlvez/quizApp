import { User } from '../models/User.js';


// Rota para exibir o formulário de registro de usuários
export const view = (req, res) => {
    res.sendFile('users.html', { root: 'public' });
  };

// criar usuário
export const createUser = async (req, res) =>{
    try{
        const user = new User(req.body);

        const existingUser = await User.findOne({email: user.email});

        if(existingUser){
            return res.status(400).json({error: 'Usuário já existe'});
        }

        const saved = await user.save();
        res.status(201).json(saved);
            
    }catch(error){
        console.log(error);
        res.status(400).json({error: 'Erro ao criar usuário'});
    }
}

// atualizar pontuação do usuário

export const updateUser = async (req, res) => {
    try {
        const newUser = req.body;

        const user = await User.updateOne({
            email: newUser.email
        }, {
            $set: {
                score: newUser.score
            }
        })
    }catch (error) {
        console.log(error);
        res.status(400).json({error: 'Erro ao atualizar pontuação do usuário'});
    }
}

// buscar usuário
export const findUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch{
        console.log(error);
        res.status(400).json({error: 'Erro ao buscar usuários'});
    }
}