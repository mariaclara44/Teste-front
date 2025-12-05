# Lost&Found – Achados e Perdidos Online da Galera

## Descrição do Projeto

O **Lost&Found** é uma plataforma web que visa organizar itens perdidos e encontrados na escola, permitindo que alunos facilmente visualizem e registrem objetos perdidos. O sistema possibilita a interação através de um front-end simples e intuitivo, enquanto o back-end garante um CRUD completo para a administração de itens e registros. O objetivo é oferecer um serviço eficiente para devolver itens aos seus donos, bem como organizar a gestão dos itens encontrados.

---

## Tecnologias Utilizadas

### Front-end
- **HTML**: Estrutura da página.
- **CSS**: Estilos visuais.
- **JavaScript**: Funcionalidades dinâmicas (GET e GET by ID para listar e detalhar objetos).

### Back-end
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework para construção de APIs RESTful.
- **Prisma**: ORM (Object-Relational Mapping) para interação com o banco de dados.
- **Postman**: Utilizado para testar as APIs (CRUD).

### Banco de Dados
- **PostgreSQL**: Sistema gerenciador de banco de dados relacional, utilizado para armazenar dados dos itens perdidos e encontrados.

---

## Escopo do Projeto

### Funcionalidades
1. **Cadastro de Itens**: Permite que usuários cadastrem itens encontrados.
2. **Listagem de Itens**: Exibe todos os itens encontrados e perdidos, com filtros por categoria, data e localização.
3. **Detalhamento de Itens**: Exibe informações completas sobre um item (ex: descrição, data de registro, localização, categoria).
4. **CRUD Completo**: O administrador pode adicionar, editar ou remover itens encontrados e perdidos via API.
5. **Filtro de Busca**: Busca por categoria, data e localização para facilitar a visualização dos itens.

---

## Requisitos do Sistema

### Funcionais
- **Cadastro de Itens**: Usuários podem registrar um item perdido ou encontrado no sistema.
- **Edição e Remoção**: Itens podem ser editados ou removidos caso necessário.
- **Listagem de Itens**: O sistema deve exibir todos os itens com a opção de filtragem.
- **Validações**: Validação obrigatória dos campos de formulário como descrição, categoria e localização.

### Não Funcionais
- **Segurança**: Proteção de dados sensíveis e autenticação adequada para usuários/admins.
- **Performance**: A listagem de itens deve ser rápida e eficiente, mesmo com um grande volume de registros.
- **Escalabilidade**: O sistema deve ser projetado para suportar um número crescente de itens registrados.

---

## Regras de Negócio

1. **Busca de Itens Perdidos**:  
   O sistema oferece a função de busca de itens perdidos por **ID** e **categoria**.

2. **Acompanhamento do Status do Objeto**:  
   O sistema permite que os usuários acompanhem o status dos itens, com as situações **‘Perdido’** e **‘Encontrado’**.

3. **Prazo de Guarda**:  
   Itens encontrados e não procurados serão mantidos pelo setor de achados e perdidos por um período máximo de **45 dias letivos**.

4. **Destino Final**:  
   Após o prazo de guarda:
   - **Uniformes e roupas** serão doados.
   - **Livros didáticos** serão incorporados à biblioteca.
   - **Eletrônicos de baixo valor** serão doados ou descartados.
   - **Objetos como jóias** serão enviados para um local especializado para dar o devido tratamento ao item.

5. **Prioridade de Devolução**:  
   Itens com **identificação** (etiquetas ou nome escrito) têm prioridade no **contato** e **devolução**.

6. **Registro de Achados**:  
   Todo item entregue a algum funcionário deve ser registrado no **Lost&Found** em até **24 horas úteis**.

7. **Cadastro Mínimo de Itens**:  
   O sistema deve permitir o cadastro de pelo menos **100 itens** registrados.

8. **Validações Obrigatórias**:  
   Todos os campos de cadastro de itens (descrição, categoria, localização) devem ser **obrigatoriamente preenchidos**.

---

## Funcionalidades do Sistema

### Front-end
1. **Página de Listagem de Itens**: Exibe todos os itens encontrados, com informações breves (ex: nome do item, data, categoria, e localização).
2. **Página de Detalhes do Item**: Exibe informações completas sobre o item, com possibilidade de entrar em contato com o responsável ou fazer a devolução.
3. **Filtros**: Permite filtrar itens por **categoria**, **data de perda/encontro** e **localização**.
4. **Botões de Ação**: Permitindo a ação de registrar, editar ou remover itens.

### Back-end
- **API RESTful**:
  - **GET**: Para listar os itens ou buscar itens específicos por ID.
  - **POST**: Para registrar novos itens encontrados.
  - **PUT/PATCH**: Para editar detalhes dos itens (como status ou localização).
  - **DELETE**: Para remover itens do banco de dados.

---

## Como Rodar o Projeto

### 1. **Pré-requisitos**
- Node.js (v14+)
- PostgreSQL

### 2. **Configuração do Banco de Dados**
- Crie um banco de dados no PostgreSQL e configure a conexão no arquivo `prisma/schema.prisma`.
  
### 3. **Instalação das Dependências**
No diretório raiz do projeto, execute o comando para instalar as dependências:

