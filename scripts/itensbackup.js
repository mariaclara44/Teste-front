const BASE_URL = "http://localhost:3001";

const inputBusca = document.querySelector(".search-bar input");
const grid = document.getElementById("recentItemsGrid");
const modal = document.getElementById("itemModal");
const closeBtn = document.querySelector(".close");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalCategory = document.getElementById("modalCategory");

carregarRecentes();

inputBusca.addEventListener("input", () => {
  const nome = inputBusca.value.trim();
  nome === "" ? carregarRecentes() : buscarPorNome(nome);
});

async function buscarPorNome(nome) {
  try {
    const res = await fetch(`${BASE_URL}/itens?title=${encodeURIComponent(nome)}`);
    const data = await res.json();
    mostrarItens(data.items);
  } catch {
    grid.innerHTML = "<p>Erro ao buscar itens.</p>";
  }
}

async function carregarRecentes() {
  try {
    const res = await fetch(`${BASE_URL}/itens`);
    const data = await res.json();
    mostrarItens(data.items);
  } catch {
    grid.innerHTML = "<p>Erro ao carregar itens.</p>";
  }
}

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
      <button class="detalhes-btn" data-id="${item.id}">Ver detalhes</button>
    `;

    card.querySelector(".detalhes-btn").addEventListener("click", () => {
      abrirModal(item);
    });

    grid.appendChild(card);
  });
}

function abrirModal(item) {
  modalImg.src = item.imageUrl || "";
  modalTitle.textContent = item.title || "Indisponível";
  modalDescription.textContent = "Descrição: " + (item.description || "N/A");
  modalLocation.textContent = "Local: " + (item.location || "N/A");
  modalStatus.textContent = "Status: " + (item.status || "N/A");
  if (modalCategory) modalCategory.textContent = "Categoria: " + (item.category || "N/A");
  modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
