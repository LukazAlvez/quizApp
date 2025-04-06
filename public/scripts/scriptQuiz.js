document.getElementById("formQuestao").addEventListener("submit", async function(e) {
    e.preventDefault();

    const pergunta = document.getElementById("pergunta").value;
    const inputs = document.querySelectorAll(".option-group input");
    const opcoes = Array.from(inputs).map(input => input.value);
    const respostaCorreta = document.getElementById("resposta").value;

    // Validação simples
    if (opcoes.length !== 4 || opcoes.includes("")) {
      return alert("Preencha todas as 4 opções.");
    }
    if (!opcoes.includes(respostaCorreta)) {
      return alert("A resposta correta deve estar entre as opções.");
    }

    const questao = {
      pergunta,
      opcoes,
      respostaCorreta
    };

    // Enviar para o backend (ajuste a URL da sua API)
    try {
      const res = await fetch("api/register-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questao)
      });

      if (res.ok) {
        alert("Questão cadastrada com sucesso!");
        document.getElementById("formQuestao").reset();
      } else {
        alert("Erro ao cadastrar questão.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    }
  });