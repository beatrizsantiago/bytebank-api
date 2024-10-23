<h1 align="center">ByteBank API</h1>

### ✨ Sobre

<h4>API do Tech Challenge da Pós Tech FIAP</h4>

<b>Versão:</b> 1.0.0

### 📌 Stack de Desenvolvimento

- [NodeJS](https://nodejs.dev/en/learn/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### 🛠 Ferramentas
- Documentação com [Swagger](https://swagger.io/specification/)
- IDE: [VSCode](https://code.visualstudio.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Insomnia](https://insomnia.rest/)

## Instruções para Configuração do Ambiente Local

### 1. Criar uma Conta no MongoDB Atlas

- Acesse [MongoDB Atlas](https://cloud.mongodb.com) e crie uma conta. O processo é simples e intuitivo.
- Após criar sua conta, crie uma instância gratuita do MongoDB. Você pode escolher qualquer provedor e nome para o cluster. No exemplo, usamos AWS, São Paulo 1, e o nome do cluster foi `bytebank`.
- Durante a configuração, escolha um nome de usuário e senha para o banco de dados e certifique-se de liberar o IP da sua máquina na aba de conectividade.
- Ao finalizar, copie a string de conexão que será gerada. Exemplo:

  ```bash
  mongodb+srv://<usuário>:<senha>@bytebank.7moh3.mongodb.net/?retryWrites=true&w=majority&appName=bytebank
  ```

### 2. Verificar Instalação do Node.js

- Abra um terminal e execute o comando:
    
  ```bash
  node -v
  ```
    
- Se aparecer uma versão como a listada abaixo significa que o Node.js está instalado corretamente. Caso contrário, baixe e instale-o a partir do [site oficial](https://nodejs.dev/en/learn/) ou procure "Node.js" no Google.
    
  ```bash
  v20.18.0
  ```

### 3. Clonar o Repositório e Instalar Dependências

- Clone o repositório do projeto:

  ```bash
  git clone https://github.com/beatrizsantiago/bytebank-api.git
  ```

- Acesse a pasta do projeto e instale as dependências com o npm:

  ```bash
  cd bytebank-api
  npm install
  ```

### 4. Configurar o Arquivo `.env`

- Copie o arquivo `.env.example` para um novo arquivo `.env`.

  **Windows:**
  ```bash
  copy .env.example .env
  ```

  **Mac OS / Linux:**
  ```bash
  cp .env.example .env
  ```

- Edite as seguintes variáveis no arquivo `.env`:
  - **DATABASE_URL**: A URL do MongoDB obtida no passo 1.
  - **TOKEN_SECRET**: Uma string secreta de sua escolha para gerar o token JWT de autenticação.

  Exemplo de como o arquivo `.env` deve ficar:

  ```bash
  DATABASE_URL=mongodb+srv://<usuário>:<senha>@bytebank.7moh3.mongodb.net/?retryWrites=true&w=majority&appName=bytebank
  PORT=3001
  TOKEN_SECRET=segredo
  ```

### 5. Gerar a Documentação Swagger

- Execute o comando abaixo para gerar a documentação do Swagger:

  ```bash
  npm run swagger-autogen
  ```

### 6. Executar o Projeto

- Inicie o projeto com o seguinte comando:

  ```bash
  npm start
  ```

- Se a mensagem a seguir aparecer, o projeto estará rodando corretamente:

  ```bash
  Server Started at 3001
  Database Connected
  ```

Para acessar a documentação, abra [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/) com seu navegador.
