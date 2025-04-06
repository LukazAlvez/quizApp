import mongoose from 'mongoose';

function arrayLimit(val) {
    return val.length === 4; // Exatamente 4 opções
  }

const quizSchema = new mongoose.Schema({
    pergunta: {
        type: String,
        required: true
    },
    opcoes: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
    },
    respostaCorreta: {
        type: String,
        required: true
    },
    pontos:{
        type: Number,
        default: 10
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export const Quiz = mongoose.model('Quiz', quizSchema);