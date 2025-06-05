const listaCarrinho = document.getElementById("lista-carrinho");
const btnLimpar = document.getElementById("btn-limpar");

function carregarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = '<p class="alert alert-info">Seu carrinho está vazio.</p>';
    btnLimpar.style.display = "none";
    return;
  }
  btnLimpar.style.display = "inline-block";

  let total = 0;
  const containerItens = document.createElement("div");

  carrinho.forEach((item, index) => {
    const { produto, quantidade } = item;
    total += produto.preco * quantidade;

    const divItem = document.createElement("div");
    divItem.className = "item-carrinho d-flex align-items-center gap-3 my-3";

    divItem.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100px; height: auto; object-fit: contain;" />
      <div class="item-info flex-grow-1">
        <div class="item-nome fw-bold">${produto.nome}</div>
        <div class="item-preco">R$ ${(produto.preco * quantidade).toFixed(2)} (R$ ${produto.preco.toFixed(2)} cada)</div>
      </div>
      <div class="quantidade-controle d-flex align-items-center" aria-label="Controle de quantidade para ${produto.nome}">
        <button class="btn btn-sm btn-outline-secondary" aria-label="Diminuir quantidade" onclick="alterarQuantidade(${index}, -1)">−</button>
        <span class="mx-2">${quantidade}</span>
        <button class="btn btn-sm btn-outline-secondary" aria-label="Aumentar quantidade" onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
      <button class="btn btn-sm btn-outline-danger ms-3" aria-label="Remover ${produto.nome} do carrinho" onclick="removerItem(${index})">&times;</button>
    `;

    containerItens.appendChild(divItem);
  });

  listaCarrinho.appendChild(containerItens);

  const totalDiv = document.createElement("div");
  totalDiv.className = "mt-3 fs-5 fw-bold text-end";
  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
  listaCarrinho.appendChild(totalDiv);
}

function alterarQuantidade(index, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (!carrinho[index]) return;

  carrinho[index].quantidade += delta;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

btnLimpar.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
    localStorage.removeItem("carrinho");
    carregarCarrinho();
  }
});

document.addEventListener("DOMContentLoaded", carregarCarrinho);
