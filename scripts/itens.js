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

const IP_DO_BACKEND = "192.168.15.74";
const PORTA = 3001;
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;

let allItems = [];

async function buscarItemsDaAPI() {
  lista.innerHTML = `<p>Carregando itens...</p>`;
  try {
    const resposta = await fetch(`${URL_BASE_API}/items`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    }

    const data = await resposta.json();

    if (!data || !Array.isArray(data.items)) {
      throw new Error("A API não retornou a estrutura de dados esperada.");
    }

    allItems = data.items;
    popularFiltros(allItems);
    mostrarLista(allItems);
  } catch (error) {
    console.error("Erro ao buscar itens da API:", error);
    lista.innerHTML = `<p style="color: red;">Erro ao carregar dados. Verifique o IP, a conexão com o servidor e o console.</p>`;
  }
}

function popularFiltros(items) {
  const categories = [...new Set(items.map((item) => item.category))].filter(
    Boolean
  );
  const locations = [...new Set(items.map((item) => item.location))].filter(
    Boolean
  );
  const statuses = [...new Set(items.map((item) => item.status))].filter(
    Boolean
  );

  selectCategory.innerHTML =
    '<option value="todos">Todas as Categorias</option>';
  selectLocation.innerHTML = '<option value="todos">Todos os Locais</option>';
  selectStatus.innerHTML = '<option value="todos">Todos os Status</option>';

  categories.forEach((cat) => {
    selectCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
  locations.forEach((loc) => {
    selectLocation.innerHTML += `<option value="${loc}">${loc}</option>`;
  });
  statuses.forEach((stat) => {
    selectStatus.innerHTML += `<option value="${stat}">${stat}</option>`;
  });
}

function mostrarLista(arrayDeItens) {
  lista.innerHTML = "";

  if (arrayDeItens.length === 0) {
    lista.innerHTML = "<p>Nenhum item encontrado.</p>";
    return;
  }

  arrayDeItens.forEach((item) => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <h3>${item.category}</h3>
      <p><strong>Local:</strong> ${item.location}</p>
      <p><strong>Status:</strong> ${item.status}</p>
    `;

    card.onclick = () => mostrarDetalhes(item);
    lista.appendChild(card);
  });
}

function mostrarDetalhes(item) {
  const dataCadastro = new Date(item.createdAt).toLocaleDateString("pt-BR");

  const encontradoPor = item.foundBy
    ? item.foundBy.name
    : "Ainda não encontrado";

  detalhes.innerHTML = `
    <div class="detalhes-card">
        <h2>Detalhes do Item (ID: ${item.id})</h2>
        <h3>${item.category}</h3>
        <p><strong>Local:</strong> ${item.location}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <hr>
        <p><strong>Cadastrado por:</strong> ${item.owner.name}</p>
        <p><strong>Encontrado por:</strong> ${encontradoPor}</p>
        <p><strong>Data de Cadastro:</strong> ${dataCadastro}</p>
        <button id="voltar">Voltar</button>
    </div>
  `;

  lista.style.display = "none";
  detalhes.style.display = "block";
  document.getElementById("voltar").onclick = voltar;
}

function voltar() {
  detalhes.style.display = "none";
  lista.style.display = "grid";
}

function filtrar() {
  const termo = inputBuscar.value.toLowerCase();
  const category = selectCategory.value;
  const location = selectLocation.value;
  const status = selectStatus.value;

  let filtrados = allItems.filter((item) => {
    const matchTermo =
      (item.category || "").toLowerCase().includes(termo) ||
      (item.location || "").toLowerCase().includes(termo);

    const matchCategory = category === "todos" || item.category === category;
    const matchLocation = location === "todos" || item.location === location;
    const matchStatus = status === "todos" || item.status === status;

    return matchTermo && matchCategory && matchLocation && matchStatus;
  });

  mostrarLista(filtrados);
}

btnBuscar.onclick = filtrar;

btnReset.onclick = () => {
  inputBuscar.value = "";
  selectCategory.value = "todos";
  selectLocation.value = "todos";
  selectStatus.value = "todos";
  mostrarLista(allItems);
};

selectCategory.onchange = filtrar;
selectLocation.onchange = filtrar;
selectStatus.onchange = filtrar;

window.addEventListener("resize", () => {
  document.body.style.minHeight = window.innerHeight + "px";
});

buscarItemsDaAPI();
