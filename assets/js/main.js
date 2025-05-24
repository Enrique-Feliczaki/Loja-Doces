const produtosLinha1 = [
    { nome: "Goma Arco-Íris", preco: 4.99, imagem: "assets/img/goma1.jpg" },
    { nome: "Dentaduras Fini", preco: 3.50, imagem: "assets/img/dentadura.jpg" },
    { nome: "Ursinhos Azedos", preco: 5.25, imagem: "assets/img/ursinhos.jpg" },
    { nome: "Tubes Morango", preco: 6.00, imagem: "assets/img/tubes.jpg" },
    { nome: "Balas Cítricas", preco: 3.99, imagem: "assets/img/balas.jpg" },
    { nome: "Anéis Azedos", preco: 4.75, imagem: "assets/img/aneis.jpg" },
    { nome: "Torcidas Frutas", preco: 5.50, imagem: "assets/img/torcidas.jpg" },
    { nome: "Mini Marshmallow", preco: 4.20, imagem: "assets/img/marshmallow.jpg" },
  ];
  
  const produtosLinha2 = [
    { nome: "Goma Coca-Cola", preco: 4.80, imagem: "assets/img/coca.jpg" },
    { nome: "Pêssego Azedo", preco: 4.50, imagem: "assets/img/pessego.jpg" },
    { nome: "Banana Docinha", preco: 3.99, imagem: "assets/img/banana.jpg" },
    { nome: "Morango Delícia", preco: 5.00, imagem: "assets/img/morango.jpg" },
    { nome: "Coração Gelado", preco: 4.90, imagem: "assets/img/coracao.jpg" },
    { nome: "Brilho Cereja", preco: 5.10, imagem: "assets/img/cereja.jpg" },
    { nome: "Fini Melancia", preco: 3.75, imagem: "assets/img/melancia.jpg" },
    { nome: "Doce Bananinha", preco: 3.60, imagem: "assets/img/bananinha.jpg" },
  ];
  
  const produtosLinha3 = [
    { nome: "Rosquinha Açucarada", preco: 4.20, imagem: "assets/img/rosquinha.jpg" },
    { nome: "Goma de Ursinho", preco: 4.00, imagem: "assets/img/ursinhos2.jpg" },
    { nome: "Torcidas Neon", preco: 6.50, imagem: "assets/img/torcidas2.jpg" },
    { nome: "Fini Dente de Vampiro", preco: 3.85, imagem: "assets/img/vampiro.jpg" },
    { nome: "Doces Explosivos", preco: 5.75, imagem: "assets/img/explosivos.jpg" },
    { nome: "Gelatinoso Rainbow", preco: 4.60, imagem: "assets/img/rainbow.jpg" },
    { nome: "Picolé de Gelatina", preco: 5.99, imagem: "assets/img/picole.jpg" },
    { nome: "Cenoura Doce", preco: 3.30, imagem: "assets/img/cenoura.jpg" },
  ];
  
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
          </div>
        `;
        row.appendChild(col);
      });
  
      item.appendChild(row);
      container.appendChild(item);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    criarCarrossel(produtosLinha1, "produtos-carousel-1");
    criarCarrossel(produtosLinha2, "produtos-carousel-2");
    criarCarrossel(produtosLinha3, "produtos-carousel-3");
  
    setTimeout(() => {
      alert("🎉 Promoção: Aproveite nossos combos com 10% OFF!");
    }, 2000);
  });
  