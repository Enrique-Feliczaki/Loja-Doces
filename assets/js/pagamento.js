// Seleciona o formulário de pagamento e o container do resumo do carrinho
const form = document.getElementById("form-pagamento");
const resumoCarrinho = document.getElementById("resumo-carrinho");

// Função para exibir o resumo dos produtos no carrinho
function exibirResumoCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Se o carrinho estiver vazio, exibe uma mensagem de aviso
  if (carrinho.length === 0) {
    resumoCarrinho.innerHTML = `<p class="alert alert-warning">Nenhum item no carrinho.</p>`;
    return;
  }

  let total = 0;
  let html = '<ul class="list-group">';

  // Gera o HTML para cada item do carrinho com nome, quantidade, preço unitário e subtotal
  carrinho.forEach(({ produto, quantidade }) => {
    const subtotal = produto.preco * quantidade;
    total += subtotal;

    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${produto.nome}</strong><br />
          <small>${quantidade} x R$ ${produto.preco.toFixed(2)}</small>
        </div>
        <span>R$ ${subtotal.toFixed(2)}</span>
      </li>
    `;
  });

  // Adiciona o total no final da lista
  html += `
    <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
      Total
      <span>R$ ${total.toFixed(2)}</span>
    </li>
  </ul>`;

  // Insere o HTML no container do resumo
  resumoCarrinho.innerHTML = html;
}

// Exibe o resumo assim que a página for carregada
document.addEventListener("DOMContentLoaded", exibirResumoCarrinho);

// Evento para submissão do formulário de pagamento
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Valida o formulário e exibe erros visuais se inválido
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Se válido, mostra alerta de sucesso
  alert("✅ Pagamento realizado com sucesso! Obrigado pela compra 🍬");

  // Limpa o carrinho no localStorage
  localStorage.removeItem("carrinho");

  // Redireciona para a página inicial
  window.location.href = "index.html";
});
