let questoes = [];
let questaoAtual = null;

//recuperar dados do usuario
const usuario = JSON.parse(localStorage.getItem('userData'));
console.log(usuario);

document.getElementById('userName').textContent = 'Pontuação: '+ usuario.score;

function pontuar(){
    usuario.score += questaoAtual.pontos;
    localStorage.setItem('userData', JSON.stringify(usuario));
    document.getElementById('userName').textContent = 'Pontuação: '+ usuario.score;
}

//função de envio de pontuação
async function enviarPontuação(){
    try {
        const newScore = await fetch('/update-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
    }catch (error) {
        console.error('Erro ao enviar pontuação:', error);
    }
}



// Função para embaralhar array (algoritmo Fisher-Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Carrega questões do backend
async function carregarQuestoes() {
    try {
    const res = await fetch('/api/questoes'); // ajuste para sua API
    const data = await res.json();
    questoes = embaralhar(data); // embaralha a ordem
    mostrarProxima();
    } catch (err) {
        console.error('Erro ao carregar questões:', err);
        document.getElementById('pergunta').innerText = 'Erro ao carregar questões.';
    }
}

function mostrarProxima() {
    document.getElementById('feedback').innerText = '';
    document.getElementById('proxima').style.display = 'none';

    if (questoes.length === 0) {
        enviarPontuação();
        document.getElementById('pergunta').innerText = 'Você respondeu todas as questões!';
        document.getElementById('opcoes').innerHTML = '';
        document.getElementById('ranking').innerHTML = '<a href="ranking.html"><button>Ver Ranking</button></a>';
    return;
    }

    questaoAtual = questoes.pop(); // pega a última (já embaralhada)
    document.getElementById('pergunta').innerText = questaoAtual.pergunta;

    const opcoesContainer = document.getElementById('opcoes');
    opcoesContainer.innerHTML = '';

    questaoAtual.opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.className = 'opcao';
        btn.innerText = opcao;
        btn.onclick = () => verificarResposta(opcao);
        opcoesContainer.appendChild(btn);
    });
}

function verificarResposta(respostaSelecionada) {
    const correta = questaoAtual.respostaCorreta;
    const feedback = document.getElementById('feedback');

    if (respostaSelecionada === correta) {
        feedback.innerText = '✅ Resposta correta!';
        feedback.style.color = 'green';
        pontuar();
    } else {
        feedback.innerText = `❌ Resposta errada. Resposta correta: ${correta}`;
        feedback.style.color = 'red';
    }

    // Desativar botões
    document.querySelectorAll('.opcao').forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correta) {
          btn.style.backgroundColor = 'green';
        } else if (btn.innerText === respostaSelecionada) {
          btn.style.backgroundColor = 'red';
        }
    });

    document.getElementById('proxima').style.display = 'inline-block';
}

document.getElementById('proxima').addEventListener('click', mostrarProxima);

carregarQuestoes();