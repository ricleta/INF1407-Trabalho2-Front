# INF1407 - Trabalho 2 - Frontend

Este repositório contém o **Front-end** do Trabalho 2 de Programação para Web (2025/2). É uma aplicação Web estática que consome a API do backend para fornecer uma plataforma de avaliação de jogos.

## Membros do Grupo
* **Felipe de Aragão Falcão** - Matrícula: 2120360
* **Ricardo Bastos Leta Vieira** - Matrícula: 2110526

---

## Links Importantes

* **Este Repositório (Frontend):** [https://github.com/ricleta/INF1407-Trabalho2-Front](https://github.com/ricleta/INF1407-Trabalho2-Front)
* **Repositório do Backend:** [https://github.com/ricleta/INF1407-Trabalho2-Back](https://github.com/ricleta/INF1407-Trabalho2-Back)
* **Site Publicado (Github Pages):** [https://ricleta.github.io/INF1407-Trabalho2-Front/](https://ricleta.github.io/INF1407-Trabalho2-Front/)
* **API do Backend:** [https://ricleta.pythonanywhere.com/](https://ricleta.pythonanywhere.com/)

---

## Escopo do Frontend

O frontend funciona como uma aplicação cliente que interage com o servidor via requisições AJAX (`fetch`).

* [cite_start]**Tecnologias:** HTML5, CSS3 e TypeScript[cite: 34].
* **Arquitetura:** SPA (Simulada) - As páginas são arquivos HTML separados, mas compartilham módulos TypeScript para lógica e navegação.
* **Funcionalidades:**
    * Interface de Login/Cadastro.
    * Dashboard adaptativo (botões mudam conforme o grupo do usuário: Desenvolvedor ou Avaliador).
    * Formulários para criação/edição de Jogos e Avaliações.
    * Listagem de dados consumidos da API.

---

## Manual do Usuário

### 1. Acesso Inicial
Ao acessar o site, o usuário vê a lista pública de jogos e avaliações. Para interagir, é necessário fazer **Login** ou **Cadastro** através da barra de navegação.

### 2. Cadastro
No menu "Register", crie uma conta escolhendo o perfil:
* **Desenvolvedor (GameDev):** Poderá cadastrar e gerenciar jogos.
* **Avaliador (Reviewer):** Poderá escrever avaliações para os jogos existentes.

### 3. Perfil Desenvolvedor
* Acesse **"My Games"** para ver seus jogos.
* Use **"Create Game"** para adicionar um novo título.
* Você pode **Editar** ou **Excluir** apenas os jogos que você criou.

### 4. Perfil Avaliador
* Acesse **"My Reviews"** para gerenciar suas críticas.
* Use **"Create Review"** para selecionar um jogo e dar uma nota (1-10) e comentário.
* **Restrição:** Você não pode alterar qual jogo foi avaliado após criar a avaliação, apenas a nota e o texto.

---

## Instruções de Instalação e Execução Local

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/ricleta/INF1407-Trabalho2-Front.git](https://github.com/ricleta/INF1407-Trabalho2-Front.git)
    cd INF1407-Trabalho2-Front
    ```

2.  **Compilar o TypeScript (Opcional se usar os arquivos JS já gerados):**
    Certifique-se de ter o Node.js instalado.
    ```bash
    cd frontend
    npm install typescript --save-dev
    npx tsc -w  # Modo watch para compilar alterações em tempo real
    ```

3.  **Rodar a aplicação:**
    Utilize um servidor estático (como a extensão **Live Server** do VS Code) abrindo a pasta raiz ou `docs/` e executando o arquivo `index.html`.

4.  **Configuração da API:**
    O arquivo `js/api_resolver.js` detecta automaticamente se o site está rodando localmente ou em produção para apontar para a URL correta do backend.

---

## Imagens do Sistema

1.  **Página de Login:**
    *(Inserir imagem da tela de login)*

2.  **Listagem de Jogos (Home):**
    *(Inserir imagem da listagem de jogos)*

3.  **Criação de Avaliação:**
    *(Inserir imagem do formulário de avaliação)*

---

## Relato de Desenvolvimento (Frontend)

### O que funcionou
* **TypeScript:** O uso de interfaces (`Game`, `Review`, `User`) garantiu segurança de tipos ao manipular os dados JSON vindos da API.
* **Autenticação:** O armazenamento do Token no `localStorage` e a injeção automática no header `Authorization` via função helper `fetchWithAuth` funcionaram perfeitamente para manter a sessão.
* **UX Dinâmica:** A barra de navegação (`navbar.js`) se adapta corretamente, mostrando ou escondendo links baseados no grupo do usuário logado.

### O que não funcionou
* **Feedback de Erros: (Possivelmente alterar)** Algumas mensagens de erro vindas da API (como JSON bruto) são exibidas diretamente ao usuário em casos de falha na validação, o que não é esteticamente ideal.

---

## Critérios Atendidos (Frontend)
* [x] Site HTML/CSS/JS (TypeScript).
* [x] Uso de Git e Repositório Público.
* [x] Consumo de API REST (CRUD).
* [x] Login e ações por usuário/grupo.
* [x] Gerência de Senha (telas de solicitação e troca).