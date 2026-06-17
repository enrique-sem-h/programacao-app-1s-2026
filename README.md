## Integrantes

| Nome | Matrícula | Atribuições |
|------|-----------|-------------|
| **Mariana Terol** | UC22200554 | Desenvolvimento do frontend (telas, navegação e integração com a API); implementação do sistema de pagamento via Pix (Abacatepay); implementação do chat em tempo real (Firebase) |
| **Enrique Carvalho** | UC22103250 | Estruturação do backend (autenticação, login e registro); CRUD de anúncios e fotos; configuração do banco de dados e migrations |

> O desenvolvimento foi colaborativo, com ambos os integrantes contribuindo em diferentes partes do projeto conforme a necessidade.

# Estrutura

- /Alugae → app Expo/React Native
- /API → backend com Express.js (auth + banco de dados)

Essas camadas são serviços logicamente separados e podem ser divididos em repositórios diferentes caso necessário, a escolha foi dada devido ao escopo do projeto e **todo o front-end deve ser desacoplado do back-end via chamadas de API diretas**

# Setup do Projeto

Siga os passos abaixo para configurar e iniciar o projeto corretamente.

---

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Docker
- Node.js/npm

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

Para contornar isso, estamos usando o concurrently, mas nem sempre o container da api sobe antes do banco de dados, o que pode gerar um erro. (verifique os logs do container da api, mas geralmente funciona)

Por conta disso, pode ser que as migrations precisem ser executadas manualmente.

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
> **Simulador iOS (Mac):** pressione `i`
> **Simulador Android:** pressione `a`
> **Dispositivo físico:** escaneie o QR code com o app Expo Go

---

### 5. Rode o seed para popular o banco de dados (opcional)

Caso deseje popular o banco de dados, execute dentro do container da api:
```bash
npm run db:seed
```
Obs: as migrations devem ter rodado e o banco de dados deve estar com todas as tabelas!

---

## Projeto em execução

Após finalizar os passos acima:

- Backend estará disponível via Docker
- Frontend Expo estará conectado à API
- Banco de dados estará migrado corretamente

O ambiente estará pronto para desenvolvimento.

---

## Observações importantes

### Cadastro de usuários
- O CPF deve ser válido matematicamente (o Abacatepay valida)
- O telefone deve ter exatamente 11 dígitos (DDD + número, sem formatação)
- A senha deve conter letras maiúsculas, minúsculas, números e símbolos (ex: `Teste@123`)

### Pagamentos
- Os pagamentos usam o Abacatepay em modo de desenvolvimento (`devMode: true`)
- Cada desenvolvedor precisa da **própria chave** do Abacatepay
- O CPF usado no cadastro precisa ser um CPF matematicamente válido

### Firebase (Chat)
- O chat em tempo real usa Firebase Firestore
- As credenciais do Firebase estão em `Alugae/firebaseConfig.js`
- O projeto Firebase é compartilhado entre os desenvolvedores

---

## Funcionalidades
- [x] Cadastro e login de usuários com foto de perfil
- [x] Criação, edição e exclusão de anúncios com fotos
- [x] Busca e filtro de anúncios por categoria
- [x] Pagamento via Pix integrado com Abacatepay
- [x] Chat em tempo real entre locador e locatário (Firebase)
- [x] Acompanhamento de status do aluguel (pendente → ativo → em uso → finalizado)
- [x] Avaliação de aluguéis finalizados
- [x] Carteira com histórico de ganhos e gastos
