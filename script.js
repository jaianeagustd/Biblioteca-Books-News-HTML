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
            <div style="display:flex; gap: 35px">
                <div class="card" style="width: 15rem; height: 250px;">
                    <img src=${this.getAttribute("src")} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.getAttribute("title")}</h5>
                    <p class="card-text">${this.getAttribute("price")}</p>
                    <a href="produto.html" class="btn btn-primary">Comprar</a>
                </div>
                </div>
            </div>
        `;
        this.appendChild(div);
    }
    }
    
    customElements.define("card-item", Card);

    async function loadProducts() {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        const container = document.getElementById("products-container");
    
        products.forEach((produts) => {
            const productCard = document.createElement("card-item");
            productCard.setAttribute("id", produts.id);
            productCard.setAttribute("title", produts.title);
            productCard.setAttribute("price", produts.price);
            productCard.setAttribute("src", produts.src);
            productCard.setAttribute("author", produts.author);
            
    
            productCard.addEventListener("click", () => {
            // Redirecionar para a página de detalhes do produto
            window.location.href = `index.html?id=${products.id}`;
            });
    
            container.appendChild(productCard);
        });
    }
    
    loadProducts();