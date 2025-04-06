const form = document.getElementById("userForm");

localStorage.setItem('userData', JSON.stringify(data));

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    score: 0
  };

  try {
    const response = await fetch("/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      form.reset();
      window.location.href = "quiz";
    } else {
      alert("Erro: " + result.error);
    }
  } catch (error) {
    alert("Erro de conexão: " + error.message);
  }
});