const BASE_URL = "http://localhost:3001";

const inputBusca = document.querySelector(".search-bar input");
const grid = document.getElementById("recentItemsGrid");

carregarRecentes();

inputBusca.addEventListener("input", () => {
  const nome = inputBusca.value.trim();
  if (nome === "") {
    carregarRecentes();
  } else {
    buscarPorNome(nome);
  }
});

async function buscarPorNome(nome) {
  try {
    const res = await fetch(
      `${BASE_URL}/itens?title=${encodeURIComponent(nome)}`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    mostrarItens(data.items);
  } catch {
    grid.innerHTML = "<p>Erro ao buscar itens.</p>";
  }
}

async function carregarRecentes() {
  try {
    const res = await fetch(`${BASE_URL}/itens`);
    if (!res.ok) throw new Error();
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
    `;
    grid.appendChild(card);
  });
}
