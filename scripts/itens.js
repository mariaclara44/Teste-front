// Seletores de Elementos
const lista = document.querySelector(".item-grid");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");

const selectCategory = document.getElementById("selectCategory");
const selectLocation = document.getElementById("selectLocation");
const selectStatus = document.getElementById("selectStatus");

// Configurações da API
const IP_DO_BACKEND = "10.88.199.138";
const PORTA = 3001;
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;

let allItems = []; // Array para armazenar todos os itens da API

// --- 1. FUNÇÕES PRINCIPAIS ---

async function buscarItemsDaAPI() {
    lista.innerHTML = `<p>Carregando dados...</p>`;
    lista.style.display = "none"; // Oculta a lista inicialmente

    try {
        // Rota corrigida para '/itens'
        const resposta = await fetch(`${URL_BASE_API}/itens`);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const data = await resposta.json();

        // Extrai o array de itens, suportando formatos [{}, {}] ou { items: [{}, {}] }
        let itemsArray = Array.isArray(data) ? data : data.items;
        
        if (!Array.isArray(itemsArray)) {
            throw new Error("Formato de dados da API inválido.");
        }

        allItems = itemsArray;
        popularFiltros(allItems);
        lista.innerHTML = ""; // Limpa a mensagem de carregamento

    } catch (error) {
        console.error("Erro ao buscar itens:", error);
        lista.style.display = "block"; // Mostra a lista para exibir a mensagem de erro
        lista.innerHTML = `<p style="color: red;">Erro ao carregar dados. Verifique a API. (${error.message})</p>`;
    }
}

function filtrar() {
    const termo = inputBuscar.value.toLowerCase();
    const category = selectCategory.value;
    const location = selectLocation.value;
    const status = selectStatus.value;

    let filtrados = allItems.filter((item) => {
        // Lógica de busca e filtro combinada
        const matchTermo =
            (item.category || "").toLowerCase().includes(termo) ||
            (item.location || "").toLowerCase().includes(termo);

        const matchCategory = category === "todos" || item.category === category;
        const matchLocation = location === "todos" || item.location === location;
        const matchStatus = status === "todos" || item.status === status;

        return matchTermo && matchCategory && matchLocation && matchStatus;
    });

    lista.style.display = "grid"; // Torna a lista visível
    mostrarLista(filtrados);
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
            <p>Local: ${item.location}</p>
            <p>Status: ${item.status}</p>
        `;
        // Não há evento de clique, pois removemos a função mostrarDetalhes
        lista.appendChild(card);
    });
}

// --- 2. POPULAÇÃO DE FILTROS ---

function popularFiltros(items) {
    const categories = [...new Set(items.map((item) => item.category))];
    const locations = [...new Set(items.map((item) => item.location))];
    const statuses = [...new Set(items.map((item) => item.status))];

    selectCategory.innerHTML = '<option value="todos">Todas as Categorias</option>';
    selectLocation.innerHTML = '<option value="todos">Todos os Locais</option>';
    selectStatus.innerHTML = '<option value="todos">Todos os Status</option>';

    categories.forEach((cat) => { if (cat) selectCategory.innerHTML += `<option value="${cat}">${cat}</option>`; });
    locations.forEach((loc) => { if (loc) selectLocation.innerHTML += `<option value="${loc}">${loc}</option>`; });
    statuses.forEach((stat) => { if (stat) selectStatus.innerHTML += `<option value="${stat}">${stat}</option>`; });
}

// --- 3. EVENTOS ---

btnBuscar.onclick = filtrar;
selectCategory.onchange = filtrar;
selectLocation.onchange = filtrar;
selectStatus.onchange = filtrar;

btnReset.onclick = () => {
    inputBuscar.value = "";
    selectCategory.value = "todos";
    selectLocation.value = "todos";
    selectStatus.value = "todos";
    filtrar(); // Chama o filtro para exibir todos os itens
};

// --- 4. INICIALIZAÇÃO ---

buscarItemsDaAPI();