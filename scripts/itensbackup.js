const lista = document.querySelector(".item-grid");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");

const selectCategory = document.getElementById("selectCategory");
const selectLocation = document.getElementById("selectLocation");
const selectStatus = document.getElementById("selectStatus");

let detalhes = document.createElement("div");
detalhes.id = "detalhes";
document.body.appendChild(detalhes);
detalhes.style.display = "none";

const HOST = window.location.hostname;
const PORT = 3001;
const BASE_URL = `http://${HOST}:${PORT}`;

async function buscarItens() {
  try {
    const response = await fetch(`${BASE_URL}/items`);
    const data = await response.json();

    const div = document.getElementById("resultado");
    div.innerHTML = "";

    data.items.forEach((item) => {
      const box = document.createElement("div");
      box.classList.add("item-card");
      box.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description || "Sem descrição"}</p>
        <p><strong>Local:</strong> ${item.location || "Não informado"}</p>
        <p><strong>Status:</strong> ${item.status || "Não informado"}</p>

        ${
          item.imageUrl
            ? `<img src="${item.imageUrl}" class="foto-item">`
            : "<p>Sem imagem</p>"
        }
      `;
      div.appendChild(box);
    });
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
  }
}

// 🔎 BUSCA POR NOME
btnBuscar.addEventListener("click", async () => {
  const nome = inputBuscar.value.trim();

  if (nome === "") {
    alert("Digite um nome para buscar.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/items?title=${nome}`);
    const data = await response.json();

    const div = document.getElementById("resultado");
    div.innerHTML = "";

    if (!data.items || data.items.length === 0) {
      div.innerHTML = "<p>Nenhum item encontrado com esse nome.</p>";
      return;
    }

    data.items.forEach((item) => {
      const box = document.createElement("div");
      box.classList.add("item-card");
      box.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description || "Sem descrição"}</p>
        <p><strong>Local:</strong> ${item.location || "Não informado"}</p>
        <p><strong>Status:</strong> ${item.status || "Não informado"}</p>

        ${
          item.imageUrl
            ? `<img src="${item.imageUrl}" class="foto-item">`
            : "<p>Sem imagem</p>"
        }
      `;
      div.appendChild(box);
    });
  } catch (error) {
    console.error("Erro ao buscar por nome:", error);
  }
});

// Carrega tudo automaticamente
window.onload = buscarItens;
