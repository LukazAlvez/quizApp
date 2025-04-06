// Simulação de dados (depois substitua pela resposta da API)
async function exibirRanking(){

    try {
        const response = await fetch('/api/users')
        const jogadores = await response.json()

        jogadores.sort((a, b) => b.score - a.score);

        console.log(jogadores);

        const tbody = document.getElementById('ranking');

        jogadores.forEach((jogador, index) => {
        const tr = document.createElement('tr');

        const posicao = index + 1;
        let classe = '';
        if (posicao === 1) classe = 'gold';
        else if (posicao === 2) classe = 'silver';
        else if (posicao === 3) classe = 'bronze';

        tr.innerHTML = `
        <td class="${classe}">${posicao}º</td>
        <td>${jogador.name}</td>
        <td>${jogador.score}</td>
        `;
        tbody.appendChild(tr);
    });
    }catch (error) {
        console.error('Erro ao buscar jogadores:', error);
    }
}

exibirRanking();    

