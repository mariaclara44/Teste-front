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

const IP_DO_BACKEND = "10.88.199.135";
const PORTA = 3001;
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;

const img = document.createElement("img");

// ATENÇÃO: Esta função foi modificada para buscar itens
// usando a API local e o valor do campo de input, mantendo
// a estrutura original da função 'buscarItems'
async function buscarItems() {
  const inputElement = document.getElementById("nome");
  const imagemContainer = document.getElementById("imagem"); // Mantido, mas provavelmente não é usado para itens

  if (!inputElement || !imagemContainer) {
    console.error(
      "Erro: O elemento com id 'nome' ou 'imagem' não foi encontrado no HTML."
    );
    return;
  }

  const termoDeBusca = inputElement.value.toLowerCase();

  // ATENÇÃO: Se o 'imagemContainer' for o lugar onde a lista é exibida,
  // você pode querer mudá-lo para 'lista.innerHTML' = ...
  imagemContainer.innerHTML = `<p>Buscando item: ${termoDeBusca}...</p>`;

  try {
    // 1. MUDANÇA DA URL para a API LOCAL /itens
    // OBS: O termoDeBusca não é incluído na URL, pois você não especificou
    // o endpoint de busca por termo no seu backend.
    const response = await fetch(`${URL_BASE_API}/itens`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Recurso /itens não encontrado no servidor.`);
      }
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // 2. LOG DE SUCESSO E VALIDAÇÃO BÁSICA
    if (!Array.isArray(data)) {
      console.log(
        `Sucesso: Recebeu dados, mas não é um array (tamanho: ${
          data ? Object.keys(data).length : "N/A"
        }).`
      );
    } else {
      console.log(`Sucesso: Recebeu ${data.length} itens.`);
    }

    // A lógica de exibição aqui precisaria ser refeita para mostrar os itens.
    // Como a instrução era não adicionar mais nada, essa parte foi deixada vazia.
    // Se o objetivo é buscar TODOS os itens, o termo de busca não se aplica.

    imagemContainer.innerHTML = `<p>Busca concluída. ${
      Array.isArray(data)
        ? data.length + " itens recebidos."
        : "Estrutura inválida."
    }</p>`;
  } catch (error) {
    console.error("Erro ao buscar itens da API:", error);
    imagemContainer.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
  }
}
