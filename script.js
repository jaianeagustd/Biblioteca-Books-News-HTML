class Navbar extends HTMLElement {
  constructor() {
// Always call super first in constructor
    super();
  }

  connectedCallback() {
    const nav = document.createElement("nav");
    nav.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Books News</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="carrinho.html"> Carrinho </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categoria
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Terror</a></li>
            <li><a class="dropdown-item" href="filtro_romance.html">Romance</a></li>
            <li><a class="dropdown-item" href="#">Ação</a></li>
            <li><a class="dropdown-item" href="#">Auto Ajuda</a></li>
            <li><a class="dropdown-item" href="#">Infantil</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="oferta.html">Oferta</a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="login.html">Login</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>`;
    this.appendChild(nav);
  }

}

customElements.define("nav-bar", Navbar);

class Card extends HTMLElement {
  constructor() {
  super();
  }
  
  connectedCallback() {
      const div = document.createElement("div");
      div.innerHTML = `
          <div id="products-container" style="display:flex;" style="display:flex; gap: 35px;"></div>
    <!--<div style="display:flex; gap: 35px">
        <div class="card" style="width: 15rem; height: 250px;">
            <img src=${this.getAttribute("src")} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.getAttribute("title")}</h5>
              <p class="card-text">R$ ${this.getAttribute("price")}</p>
              <a href="produto.html" class="btn btn-primary">Comprar</a>
            </div>
        </div>

      `;
      this.appendChild(div);
  }
  }
  
  customElements.define("card-item", Card);

  async function loadProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) {
        throw new Error('Erro ao carregar os produtos');
      }
      const products = await response.json();
      const container = document.getElementById("products-container");
  
      if (!container) {
        throw new Error('Container de produtos não encontrado');
      }
  
      products.forEach((product) => {
        // Cria um card para cada produto
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.setAttribute("data-id", product.id);
        
  
        productCard.innerHTML = `
            <img src="${product.src}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-author">${product.author}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <a href="produto.html?id=${product.id}" class="btn btn-primary">Comprar</a>
            </div>
        `;
        productCard.addEventListener("click", () => {
          // Redireciona para a página de detalhes do produto
          window.location.href = `produto.html?id=${product.id}`;
        });
  
        container.appendChild(productCard);
      });
    } catch (error) {
      console.error('Error loading products:', error);
      const container = document.getElementById("products-container");
      if (container) {
        container.innerHTML = "<p>Erro ao carregar produtos.</p>";
      }
    }
  }
  
  loadProducts();  


  //EXIBIR PRODUTOS
const url = new URL(window.location.href);

const params = new URLSearchParams(url.search);

const id = params.get('id');

async function loadProduct() {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const product = await response.json();
    const container = document.getElementById("produto-container");

    console.log(product);

    const produtos = Array.isArray(product) ? product[0] : product;
    console.log(produtos);

    container.innerHTML = `
    <div class="container">
          <div class="product">
            <img id="image" style="height: 250px; width: 500px; margin: 10px;" src="${product.src}">
            <div class="product-info" style="margin: 20px;">
              <h1 id="product-title">${product.title}</h1>
              <p style="margin: 50px; font-size: larger;"></p>
              <h4 id="sinopse" style="font-weight: 700;">Sinopse: ${product.sinopse}</h4>
              <h4 id="author" style="font-weight: 700;">Autor: ${product.author}</h4>
              <br/>
            </div>
          </div>
          <div>
            <p id="price" style="margin: 20px; font-weight: 700; font-size: larger;">Preço: R$ ${product.price.toFixed(2)} </p>
            <button id="add-to-cart" class="btn btn-primary" style="background-color: rgb(77, 150, 235); margin: 20px;">Adicionar ao Carrinho</button>
          </div>
        </div>
    `
    document.getElementById('product-title').innerHTML = product.title;
    document.getElementById('price').innerHTML = `Valor: R$ ${product.price}`;
    document.getElementById('sinopse').innerHTML = product.sinopse;
    document.getElementById('image').src = product.src;
    document.getElementById('author').innerHTML = product.author;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtoExistente = carrinho.find(item => item.id == id);

        if (!produtoExistente) {
            carrinho.push({ id: id, quantidade: 1});
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
        
        document.location.href = 'carrinho.html?id=' + id;
    });

    return product;
}
  
loadProduct()
  
  
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderCarrinho() {
    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = ""; // Limpar o container existente

    // Adicionar cada item do carrinho ao DOM
    for (let item of carrinho) {
        getData(item.id, item.quantidade);
    }
}

function getData(id, quantidade) {
    fetch(`http://localhost:3000/products/${id}`)
        .then(response => response.json())
        .then(data => renderizar(data, quantidade));
}

function renderizar(product, quantidade) {
    // Cria a linha do produto
    const produtoRow = document.createElement('tr');

    produtoRow.innerHTML = `
        <td>
            <figure class="media">
                <div class="img-wrap"><img src="${product.src}" style="height: 125px; width: 100px; margin: 10px;" class="img-thumbnail img-sm"></div>
                <figcaption class="media-body">
                    <h6 class="title text-truncate">${product.title}</h6>
                </figcaption>
            </figure>
        </td>
        <td>
            <input type="number" value="${quantidade}" min="1" max="10" class="form-control" onchange="atualizarQuantidade(${product.id}, this.value)">
        </td>
        <td>
            <div class="price-wrap">
                <var class="price">R$ ${product.price.toFixed(2)}</var> <!-- Preço Unitário -->
            </div>
        </td>
        <td>
            <div class="price-wrap">
                <var class="price">R$ ${(product.price * quantidade).toFixed(2)}</var> <!-- Total -->
            </div>
        </td>
        <td class="text-right">
            <button class="btn btn-outline-danger" style="padding:0px"; "width:20px" onclick="remover(${product.id})">× Remover</button>
        </td>
    `;

    // Adiciona a linha ao container de produtos
    document.getElementById('produtos').appendChild(produtoRow);
}


function atualizarQuantidade(id, novaQuantidade) {
    carrinho = carrinho.map(item => {
        if (item.id == id) {
            item.quantidade = Number(novaQuantidade);
        }
        return item;
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCarrinho();  // Re-renderizar o carrinho para atualizar os preços
}


function remover(id) {
    carrinho = carrinho.filter(item => item.id != id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCarrinho();  // Re-renderizar o carrinho após a remoção
}

// Inicializar a renderização do carrinho
renderCarrinho();
