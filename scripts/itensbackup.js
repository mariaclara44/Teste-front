const BASE_URL = "http://localhost:3001";

const inputBusca = document.getElementById("inputBusca");
const grid = document.getElementById("recentItemsGrid");
const modal = document.getElementById("itemModal");
const closeBtn = document.querySelector(".close");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalCategory = document.getElementById("modalCategory");

let allItems = [];

carregarRecentes();

inputBusca.addEventListener("input", () => {
  const valor = inputBusca.value.trim().toLowerCase();

  if (valor === "") {
    mostrarItens(allItems);
    return;
  }

  const filtrados = allItems.filter(
    (item) =>
      item.title?.toLowerCase().includes(valor) ||
      item.category?.toLowerCase().includes(valor) ||
      item.location?.toLowerCase().includes(valor)
  );

  mostrarItens(filtrados);
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

async function carregarRecentes() {
  try {
    const res = await fetch(`${BASE_URL}/itens`);

    if (!res.ok) {
      throw new Error(`Erro HTTP! Status: ${res.status}`);
    }

    const data = await res.json();

    allItems = data.items || data;

    mostrarItens(allItems);
  } catch (error) {
    console.error("Erro ao carregar itens:", error);
    grid.innerHTML = `<p class="error-message">Não foi possível carregar os itens. Verifique se o servidor (${BASE_URL}) está ativo.</p>`;
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
      <img src="${item.imageUrl || ""}" alt="${
      item.title || "Item sem título"
    }">
      <h3>${item.title || "Item sem título"}</h3>
      <p>${item.location || "Local não informado"}</p>
      <button class="detalhes-btn">Ver detalhes</button>
    `;

    card
      .querySelector("button")
      .addEventListener("click", () => abrirModal(item));

    grid.appendChild(card);
  });
}

function abrirModal(item) {
  modalImg.src = item.imageUrl || "";
  modalImg.alt = item.title || "Imagem do item";

  modalTitle.textContent = item.title || "Sem título";

  modalCategory.textContent = "Categoria: " + (item.category || "N/A");
  modalLocation.textContent = "Local: " + (item.location || "N/A");
  modalStatus.textContent = "Status: " + (item.status || "N/A");
  modalDescription.textContent = "Descrição: " + (item.description || "N/A");

  modal.style.display = "flex";
}
