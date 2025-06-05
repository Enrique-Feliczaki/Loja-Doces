const form = document.getElementById("form-pagamento");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Aqui pode colocar a lógica do pagamento, API, ou simular sucesso
  alert("Pagamento realizado com sucesso! Obrigado pela compra 🍬");

  // Limpar localStorage do carrinho após pagamento
  localStorage.removeItem("carrinho");

  // Redirecionar para página inicial ou agradecimento
  window.location.href = "index.html";
});
