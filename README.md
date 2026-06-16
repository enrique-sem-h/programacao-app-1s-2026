# programacao-app-1s-2026

Desenvolvimento em React Native para a disciplina de Programação de App do curso de Engenharia de Software/UCB

# Estrutura

- /Alugae → app Expo/React Native
- /API → backend com Express.js (auth + banco de dados)

Essas camadas são serviços logicamente separados e podem ser divididos em repositórios diferentes caso necessário, a escolha foi dada devido ao escopo do projeto e **todo o front-end deve ser desacoplado do back-end via chamadas de API diretas**

# Branches

Este projeto está dividido em 3 branches de acordo com a disciplina

- `main`: arquivos do projeto final (RN/Expo)
- `E03_Telas`: arquivos da **entrega 03/2.1**, de acordo com a imagem 1.
- `E03_CRUD-ORM`: arquivos da _aplicação CLI_ abordada na **entrega 03/2.2**.
- `E04_RN-CRUD-ORM`: arquivos da **entrega 04/2.1**.

Imagem 1:
![Imagem entrega 03/2.1](./repo-assets//Ex2.1.png)

# Setup do Projeto

Siga os passos abaixo para configurar e iniciar o projeto corretamente.

---

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Docker
- Node.js
- npm
- Expo Go

---

## Variáveis de Ambiente

Antes de iniciar qualquer serviço, é necessário criar dois arquivos `.env`.

### Backend

Crie o arquivo:

```bash
Backend/.env
```

Defina as seguintes variáveis com quaisquer valores:

```env
MYSQL_ROOT_PASSWORD=
MYSQL_HOST=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_PORT=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ABACATE_API_KEY=
```
> **Cloudinary:** crie uma conta em [cloudinary.com](https://cloudinary.com) e copie as credenciais do dashboard.

> **Abacatepay:** crie uma conta em [app.abacatepay.com](https://app.abacatepay.com), vá em **Integração → API**, crie uma nova chave selecionando **API v1**.

---

### Frontend

Crie o arquivo:

```bash
Alugae/.env
```

Adicione:

```env
EXPO_PUBLIC_API_URL=
```

> `EXPO_PUBLIC_API_URL` deve apontar para o IP do servidor Express.

Exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
```

---

## 🛠️ Inicialização do Backend

### 1. Acesse a pasta do backend

```bash
cd Backend
```

---

### 2. Suba os serviços Docker

Execute um dos comandos abaixo:

```bash
docker compose -f infra/docker/compose.yaml up -d
```

ou

```bash
npm run services:up
```

---

### 3. Execute as migrations manualmente

Atualmente existe um problema conhecido envolvendo o Drizzle ORM em ambientes Docker:

- https://github.com/drizzle-team/drizzle-orm/issues/5622

Por conta disso, as migrations precisam ser executadas manualmente.

### Gere as migrations

```bash
docker exec -it alugae-api npm run db:generate
```

### Execute as migrations

```bash
docker exec -it alugae-api npm run db:migrate
```

---

## Inicialização do Frontend

### 1. Abra outro terminal

Acesse a pasta do frontend:

```bash
cd Alugae
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Inicie o projeto

```bash
npm run dev
```

Aguarde a inicialização do túnel do ngrok.

---

### 4. Caso ocorra erro com o ngrok

Execute:

```bash
npx expo start -c
```

---

## Projeto em execução

Após finalizar os passos acima:

- Backend estará disponível via Docker
- Frontend Expo estará conectado à API
- Banco de dados estará migrado corretamente

O ambiente estará pronto para desenvolvimento.
