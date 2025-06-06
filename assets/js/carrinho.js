// Referências aos elementos do DOM para lista de itens do carrinho e botão de limpar
const listaCarrinho = document.getElementById("lista-carrinho");
const btnLimpar = document.getElementById("btn-limpar");

// Função que carrega e exibe os itens do carrinho na página
function carregarCarrinho() {
  // Recupera o carrinho do localStorage, ou cria array vazio se não existir
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  
  // Limpa o conteúdo anterior do container do carrinho
  listaCarrinho.innerHTML = "";

  // Se o carrinho estiver vazio, exibe mensagem e esconde botão limpar
  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = '<p class="alert alert-info">Seu carrinho está vazio.</p>';
    btnLimpar.style.display = "none";
    return;
  }

  // Mostra o botão de limpar se houver itens no carrinho
  btnLimpar.style.display = "inline-block";

  // Inicializa variável para totalizar preço total da compra
  let total = 0;

  // Cria container para agrupar os itens exibidos
  const containerItens = document.createElement("div");

  // Itera pelos itens do carrinho para criar os elementos visuais
  carrinho.forEach((item, index) => {
    const { produto, quantidade } = item;

    // Atualiza total somando o preço vezes quantidade
    total += produto.preco * quantidade;

    // Cria div para um item do carrinho, com layout flex e espaçamento
    const divItem = document.createElement("div");
    divItem.className = "item-carrinho d-flex align-items-center gap-3 my-3";

    // Define o HTML interno do item, com imagem, nome, preço e controles
    divItem.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100px; height: auto; object-fit: contain;" />
      <div class="item-info flex-grow-1">
        <div class="item-nome fw-bold">${produto.nome}</div>
        <div class="item-preco">R$ ${(produto.preco * quantidade).toFixed(2)} (R$ ${produto.preco.toFixed(2)} cada)</div>
      </div>
      <div class="quantidade-controle d-flex align-items-center" role="group" aria-label="Controle de quantidade para ${produto.nome}">
        <button class="btn btn-sm btn-outline-secondary" aria-label="Diminuir quantidade" onclick="alterarQuantidade(${index}, -1)">−</button>
        <span class="mx-2" aria-live="polite" aria-atomic="true">${quantidade}</span>
        <button class="btn btn-sm btn-outline-secondary" aria-label="Aumentar quantidade" onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
      <button class="btn btn-sm btn-outline-danger ms-3" aria-label="Remover ${produto.nome} do carrinho" onclick="removerItem(${index})">&times;</button>
    `;

    // Adiciona o item criado ao container de itens
    containerItens.appendChild(divItem);
  });

  // Adiciona o container com os itens na lista do carrinho
  listaCarrinho.appendChild(containerItens);

  // Cria e adiciona o elemento que mostra o total geral da compra
  const totalDiv = document.createElement("div");
  totalDiv.className = "mt-3 fs-5 fw-bold text-end";
  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
  listaCarrinho.appendChild(totalDiv);
}

// Função para alterar a quantidade do produto no carrinho, por índice e incremento (delta)
function alterarQuantidade(index, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (!carrinho[index]) return; // Se índice inválido, não faz nada

  carrinho[index].quantidade += delta; // Altera a quantidade atual

  // Se quantidade for zero ou menor, remove o item do carrinho
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }

  // Atualiza o localStorage com o carrinho modificado
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Recarrega a lista para refletir as alterações
  carregarCarrinho();
}

// Função para remover um item do carrinho pelo índice
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1); // Remove o item da lista
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza localStorage
  carregarCarrinho(); // Atualiza a visualização
}

// Evento para o botão "Limpar carrinho", pergunta confirmação antes de limpar tudo
btnLimpar.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
    localStorage.removeItem("carrinho"); // Remove carrinho do localStorage
    carregarCarrinho(); // Atualiza a visualização para vazio
  }
});

// Carrega o carrinho assim que o documento HTML estiver completamente carregado
document.addEventListener("DOMContentLoaded", carregarCarrinho);
