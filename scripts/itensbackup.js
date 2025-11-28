const BASE_URL = "http://localhost:3001";

// Variáveis Globais (Já definidas e corretas)
const inputBusca = document.querySelector(".search-bar input");
const grid = document.getElementById("recentItemsGrid");
const modal = document.getElementById("itemModal");
const closeBtn = document.querySelector(".close");

// Novos seletores globais para o Modal (Baseado na sua necessidade)
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
// ATENÇÃO: Verifique se este ID existe no seu HTML! (modalCategoria)
const modalCategory = document.getElementById("modalCategory"); // Usando modalCategory (melhor) ou modalCategoria

// Chamada inicial
carregarRecentes();

// ---------- BUSCA EM TEMPO REAL ----------
inputBusca.addEventListener("input", () => {
  const nome = inputBusca.value.trim();
  if (nome === "") {
    carregarRecentes();
  } else {
    buscarPorNome(nome);
  }
});

// ---------- BUSCAR POR NOME (API) ----------
async function buscarPorNome(nome) {
  try {
    const res = await fetch(
      `${BASE_URL}/itens?title=${encodeURIComponent(nome)}`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    mostrarItens(data.items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    grid.innerHTML = "<p>Erro ao buscar itens.</p>";
  }
}

// ---------- CARREGAR ITEMS RECENTES (API) ----------
async function carregarRecentes() {
  try {
    const res = await fetch(`${BASE_URL}/itens`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    mostrarItens(data.items);
  } catch (error) {
    console.error("Erro ao carregar recentes:", error);
    grid.innerHTML = "<p>Erro ao carregar itens.</p>";
  }
}

// ---------- MOSTRAR ITEMS (RENDERIZAÇÃO) ----------
function mostrarItens(lista) {
  grid.innerHTML = "";
  if (!lista || lista.length === 0) {
    grid.innerHTML = "<p>Nenhum item encontrado.</p>";
    return;
  }

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    // Adiciona o ID do item ao botão para uso futuro
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

// ---------- ABRIR MODAL (CORRIGIDO) ----------
function abrirModal(item) {
  // Remove a redeclaração de 'modal' aqui: const modal = document.getElementById("itemModal");

  // ATENÇÃO: É crucial que as variáveis globais (modalImg, modalTitle, etc.)
  // tenham sido definidas corretamente no topo do script. Se o ID estiver errado
  // no HTML, a variável será null e o script falhará.

  modalImg.src = item.imageUrl || ""; // Fallback
  modalTitle.textContent = item.title || "Indisponível";
  modalDescription.textContent = "Descrição: " + (item.description || "N/A");
  modalLocation.textContent = "Local: " + (item.location || "N/A");
  modalStatus.textContent = "Status: " + (item.status || "N/A");

  // Usando modalCategory se você o definiu no HTML e no topo do script
  if (modalCategory) {
    modalCategory.textContent = "Categoria: " + (item.category || "N/A");
  }

  modal.style.display = "flex"; // Usa a variável global 'modal'
}

// ---------- FECHAR MODAL (Mantido) ----------
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fecha clicando fora do painel (Mantido)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
