// Listas de produtos organizadas por linha para os carrosséis
const produtosLinha1 = [
  { nome: "Goma arco-íris", preco: 4.99, imagem: "assets/img/goma1.jpg" },
  { nome: "Dentaduras fini", preco: 3.50, imagem: "assets/img/dentadura.jpg" },
  { nome: "Goma de ursinhos", preco: 5.25, imagem: "assets/img/ursinhos.jpg" },
  { nome: "Tubes morango", preco: 6.00, imagem: "assets/img/tubes.jpg" },
  { nome: "Balas cítricas", preco: 3.99, imagem: "assets/img/balas.jpg" },
  { nome: "Anéis azedos", preco: 4.75, imagem: "assets/img/aneis.jpg" },
  { nome: "Torcidas frutas", preco: 5.50, imagem: "assets/img/torcidas.jpg" },
  { nome: "Mini marshmallow", preco: 4.20, imagem: "assets/img/marshmallow.jpg" },
];

const produtosLinha2 = [
  { nome: "Algodão doce", preco: 4.80, imagem: "assets/img/algodao.jpg" },
  { nome: "Beijos morango", preco: 4.50, imagem: "assets/img/beijos.jpg" },
  { nome: "Bala amoras", preco: 3.99, imagem: "assets/img/amoras.jpg" },
  { nome: "Sorvetinho fini", preco: 5.00, imagem: "assets/img/sorvetinho.jpg" },
  { nome: "Coração gelado", preco: 4.90, imagem: "assets/img/coracao.jpg" },
  { nome: "Minhocas azedas", preco: 5.10, imagem: "assets/img/minhocas.jpg" },
  { nome: "Fini melancia", preco: 3.75, imagem: "assets/img/melancia.jpg" },
  { nome: "Doce bananinha", preco: 3.60, imagem: "assets/img/bananinha.jpg" },
];

const produtosLinha3 = [
  { nome: "Lacta diamante negro", preco: 4.20, imagem: "assets/img/diamantenegro.webp" },
  { nome: "Lacta chocolate branco", preco: 4.00, imagem: "assets/img/lakabranco.webp" },
  { nome: "Lacta oreo", preco: 6.50, imagem: "assets/img/lakaoreo.webp" },
  { nome: "Lacta caramelo", preco: 3.85, imagem: "assets/img/lakacaramelo.webp" },
  { nome: "Lacta chocolate preto", preco: 5.75, imagem: "assets/img/Lakapreto.webp" },
  { nome: "Lacta shot", preco: 4.60, imagem: "assets/img/lakashot.webp" },
  { nome: "Lacta ouro branco", preco: 5.99, imagem: "assets/img/lakaourobranco.webp" },
  { nome: "Lacta sonho de valsa", preco: 3.30, imagem: "assets/img/lakasonhodevalsa.webp" },
];

// Função que cria o carrossel, dividindo os produtos em grupos de 4 por slide
function criarCarrossel(produtos, idContainer) {
  const container = document.getElementById(idContainer);
  const porSlide = 4;

  for (let i = 0; i < produtos.length; i += porSlide) {
    const grupo = produtos.slice(i, i + porSlide);

    const item = document.createElement("div");
    item.className = `carousel-item${i === 0 ? " active" : ""}`;

    const row = document.createElement("div");
    row.className = "row justify-content-center";

    grupo.forEach(produto => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-3 d-flex justify-content-center";
      col.innerHTML = `
        <div class="produto-card">
          <img src="${produto.imagem}" alt="${produto.nome}">
          <h5>${produto.nome}</h5>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <button class="btn-adicionar" onclick="adicionarAoCarrinho('${produto.nome}')">Adicionar ao carrinho</button>
        </div>
      `;
      row.appendChild(col);
    });

    item.appendChild(row);
    container.appendChild(item);
  }
}

// Função que adiciona um produto ao carrinho no localStorage
function adicionarAoCarrinho(nome) {
  // Busca o produto pelo nome em todas as listas
  const produto =
    produtosLinha1.find(p => p.nome === nome) ||
    produtosLinha2.find(p => p.nome === nome) ||
    produtosLinha3.find(p => p.nome === nome);

  if (produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.produto.nome === produto.nome);

    if (itemExistente) {
      // Se estiver, incrementa a quantidade
      itemExistente.quantidade++;
    } else {
      // Se não, adiciona o produto com quantidade 1
      carrinho.push({ produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${produto.nome} adicionado ao carrinho!`);
  } else {
    alert("Produto não encontrado.");
  }
}

// Inicializa os carrosséis quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
  criarCarrossel(produtosLinha1, "produtos-carousel-1");
  criarCarrossel(produtosLinha2, "produtos-carousel-2");
  criarCarrossel(produtosLinha3, "produtos-carousel-3");
});
