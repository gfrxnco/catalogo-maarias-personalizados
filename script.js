
/* =========================
   CONFIGURAÇÕES
========================= */

const config = {
  whatsapp: "5575982797300",
  instagram: "maariass.personalizados"
};

/* =========================
   PRODUTOS
========================= */

const products = [
  {
    id: 1,
    name: "Planner Personalizado",
    description: "Organize sua rotina com um planner feito para você.",
    price: null,
    category: "Cadernos",
    image: "imagens/planer.jpeg"
  },
  {
    id: 2,
    name: "Caneca Personalizada",
    description: "Caneca personalizada feita para você.",
    price: null,
    category: "Planners",
    image: "imagens/caneca.jpeg"
  },
  {
    id: 3,
    name: "Bloquinhos Lettering",
    description: "Bloquinhos de anotações personalizados.",
    price: null,
    category: "Agendas",
    image: "imagens/bloquinhos.jpeg"
  },
  {
    id: 4,
    name: "Bíblia",
    description: "Bíblia personalizada conforme sua preferência.",
    price: null,
    category: "Lembranças",
    image: "imagens/biblia.jpeg"
  },
  {
    id: 5,
    name: "Coleção Floral",
    description: "Produtos com estampas florais e cores delicadas.",
    price: null,
    category: "Coleções",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Caderno Rosa",
    description: "Um caderno delicado para estudos e anotações.",
    price: 45.00,
    category: "Cadernos",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
  }
];

/* =========================
   ELEMENTOS DO HTML
========================= */

const searchInput = document.getElementById("searchInput");
const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products");
const emptyState = document.getElementById("emptyState");
const productCount = document.getElementById("productCount");

const whatsappLink = document.getElementById("whatsappLink");
const instagramLink = document.getElementById("instagramLink");
const instagramContact = document.getElementById("instagramContact");
const currentYear = document.getElementById("currentYear");

/* =========================
   CATEGORIA SELECIONADA
========================= */

let selectedCategory = "Todos";

/* =========================
   FORMATAÇÃO DE PREÇOS
========================= */

function formatPrice(price) {
  if (price === null || price === undefined) {
    return "Consultar valor";
  }

  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* =========================
   LINK DO WHATSAPP
========================= */

function getWhatsAppLink(product) {
  let message;

  if (product.price === null || product.price === undefined) {
    message = `Olá! Gostaria de consultar o valor do produto "${product.name}".`;
  } else {
    message =
      `Olá! Tenho interesse no produto "${product.name}", ` +
      `anunciado por ${formatPrice(product.price)}. ` +
      "Poderia me passar mais informações?";
  }

  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* =========================
   FILTRO DE PRODUTOS
========================= */

function getFilteredProducts() {
  const searchTerm = searchInput
    ? searchInput.value.trim().toLocaleLowerCase("pt-BR")
    : "";

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.description,
      product.category
    ].join(" ").toLocaleLowerCase("pt-BR");

    const matchesSearch = searchableText.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

/* =========================
   EXIBIÇÃO DOS PRODUTOS
========================= */

function renderProducts() {
  if (!productsContainer) return;

  const filteredProducts = getFilteredProducts();
  const hasProducts = filteredProducts.length > 0;

  /* Atualiza a contagem */
  if (productCount) {
    const total = filteredProducts.length;

    productCount.textContent =
      total === 1
        ? "1 produto encontrado."
        : `${total} produtos encontrados.`;
  }

  /* Mostra a mensagem somente quando necessário */
  if (emptyState) {
  emptyState.hidden = hasProducts;
  emptyState.classList.toggle("visible", !hasProducts);
  emptyState.setAttribute("aria-hidden", String(hasProducts));
}

  /* Limpa os resultados anteriores */
  productsContainer.innerHTML = "";

  /* Se não houver resultados, encerra */
  if (!hasProducts) {
    return;
  }

  /* Cria os cards dos produtos */
  productsContainer.innerHTML = filteredProducts
    .map((product) => `
      <article class="product-card">

        <div class="product-image-container">
          <img
            src="${product.image}"
            alt="${product.name}"
            class="product-image"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </div>

        <div class="product-info">

          <span class="product-category">
            ${product.category}
          </span>

          <h3 class="product-name">
            ${product.name}
          </h3>

          <p class="product-description">
            ${product.description}
          </p>

          <div class="product-bottom">

            <span class="price">
              ${formatPrice(product.price)}
            </span>

            <a
              href="${getWhatsAppLink(product)}"
              class="contact-product"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar no WhatsApp ↗
            </a>

          </div>

        </div>

      </article>
    `)
    .join("");
}

/* =========================
   PESQUISA
========================= */

if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

/* =========================
   FILTRO POR CATEGORIA
========================= */

if (categoriesContainer) {
  categoriesContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");

    if (!button || !categoriesContainer.contains(button)) {
      return;
    }

    selectedCategory = button.dataset.category || "Todos";

    /* Atualiza o botão selecionado */
    categoriesContainer
      .querySelectorAll("[data-category]")
      .forEach((categoryButton) => {
        const isActive = categoryButton === button;

        categoryButton.classList.toggle("active", isActive);
        categoryButton.setAttribute("aria-pressed", String(isActive));
      });

    renderProducts();
  });
}

/* =========================
   LINKS DO INSTAGRAM
========================= */

function setupInstagramLink(element) {
  if (!element) return;

  element.href = `https://www.instagram.com/${config.instagram}/`;
  element.target = "_blank";
  element.rel = "noopener noreferrer";
}

setupInstagramLink(instagramLink);
setupInstagramLink(instagramContact);

/* =========================
   LINK GERAL DO WHATSAPP
========================= */

if (whatsappLink) {
  const message = encodeURIComponent(
    "Olá! Gostaria de conhecer os produtos da Maarias Personalizados."
  );

  whatsappLink.href =
    `https://wa.me/${config.whatsapp}?text=${message}`;

  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
}

/* =========================
   ANO DO RODAPÉ
========================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================
   INICIALIZAÇÃO
========================= */

renderProducts();
