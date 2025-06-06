// Seleciona o formulário de contato pelo ID
const formContato = document.getElementById("form-contato");

// Adiciona evento ao enviar o formulário
formContato.addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o comportamento padrão de envio e recarregamento da página

  // Verifica se todos os campos do formulário são válidos (validação HTML5)
  if (!formContato.checkValidity()) {
    // Se algum campo estiver inválido, adiciona classe para mostrar feedback visual de erro
    formContato.classList.add("was-validated");
    return; // Interrompe o envio para o usuário corrigir os erros
  }

  // Se a validação passar, exibe alerta de sucesso para o usuário
  alert("✅ Informações enviadas com sucesso! Entraremos em contato em breve.");

  // Reseta os campos do formulário (limpa todos os inputs)
  formContato.reset();

  // Remove a classe de validação para que o formulário volte ao estado inicial
  formContato.classList.remove("was-validated");
});
