const BASE_URL = "http://localhost:3001";

// Seletores
const inputBusca = document.getElementById("inputBusca");
const grid = document.getElementById("recentItemsGrid");
const modal = document.getElementById("itemModal");
const closeBtn = document.querySelector(".close");

// Campos do modal
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalCategory = document.getElementById("modalCategory");

let allItems = []; // <–– Guarda tudo

// Carrega itens ao abrir
carregarRecentes();

// Busca dinâmica (filtra no front)
inputBusca.addEventListener("input", () => {
  const valor = inputBusca.value.trim().toLowerCase();

  if (valor === "") {
    mostrarItens(allItems);
    return;
  }

  const filtrados = allItems.filter(item =>
    item.title?.toLowerCase().includes(valor) ||
    item.category?.toLowerCase().includes(valor) ||
    item.location?.toLowerCase().includes(valor)
  );

  mostrarItens(filtrados);
});

// 🔄 Carregar todos os itens
async function carregarRecentes() {
  try {
    const res = await fetch(`${BASE_URL}/itens`);
    const data = await res.json();

    // Suporte a API que retorna items OU array puro
    allItems = data.items || data;

    mostrarItens(allItems);
  } catch (error) {
    grid.innerHTML = "<p>Erro ao carregar itens.</p>";
  }
}

// 🧱 Renderizar cards
function mostrarItens(lista) {
  grid.innerHTML = "";

  if (!lista || lista.length === 0) {
    grid.innerHTML = "<p>Nenhum item encontrado.</p>";
    return;
  }

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.location}</p>
      <button class="detalhes-btn">Ver detalhes</button>
    `;

    card.querySelector("button").addEventListener("click", () => abrirModal(item));

    grid.appendChild(card);
  });
}

// 🔍 Abrir modal
function abrirModal(item) {
  modalImg.src = item.imageUrl || "";
  modalTitle.textContent = item.title || "Sem título";
  modalLocation.textContent = "Local: " + (item.location || "N/A");
  modalDescription.textContent = "Descrição: " + (item.description || "N/A");
  modalStatus.textContent = "Status: " + (item.status || "N/A");
  modalCategory.textContent = "Categoria: " + (item.category || "N/A");

  modal.style.display = "flex";
}

// ❌ Fechar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
