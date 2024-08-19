
# Frengee-API

Essa API de Veículos é uma aplicação desenvolvida com Node.js, Express e MongoDB, projetada para facilitar o gerenciamento de veículos. O repositório inclui todo o código-fonte necessário e as configurações para Docker, permitindo que a aplicação seja facilmente implantada e escalada em ambientes de contêineres.

## Requisitos

Antes de iniciar o processo de implantação, certifique-se de que seu ambiente atende aos seguintes requisitos:

### 1. Dependências de Software
- Node.js (v14 ou superior)
- npm
- Docker
- Docker Compose
- MongoDB: Se estiver usando o MongoDB como serviço, verifique se ele está rodando na versão 4.4 ou superior.

### 2. Dependências do Projeto
- Express: v4 ou superior
- Mongoose: v5.10 ou superior
- TypeScript: v4.0 ou superior

## Instalação

### 1. Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/frengee-api.git
cd frengee-api
```

### 2. Instalando Dependências
Instale todas as dependências do projeto utilizando o npm:

```bash
npm install
```

### 3. Executando a Aplicação

##### Usando Docker
Para rodar a aplicação usando Docker e Docker Compose:

```bash
docker compose up --build -d
```

Esse comando irá construir as imagens Docker, criar os contêineres necessários e iniciar a aplicação em segundo plano.

##### Localmente
Se preferir executar a aplicação localmente:

```bash
npm start:dev
```

### Testes
Para rodar os testes, use o seguinte comando:

```bash
npm test
```

Obs: Caso tenha algum erro de autorização, execute o seguinte comando:

```bash
sudo chown -R $USER:$USER /diretorio-da-api
```

### Documentação da API

A documentação completa da API está disponível no endpoint **/api-docs** após iniciar a aplicação. A documentação é gerada automaticamente utilizando Swagger.