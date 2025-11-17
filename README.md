# IAgiliza Fullstack

Repositório fullstack com backend em Fastify + Prisma + PostgreSQL e frontend em Next.js + TailwindCSS.

## 🚀 Tecnologias Utilizadas

### **Backend**

* Fastify
* Prisma ORM
* Zod
* TypeScript
* JWT
* bcryptjs

### **Banco de Dados**

* PostgreSQL (via Docker)

### **Frontend**

* React
* Next.js
* TypeScript
* TailwindCSS

---

## 📌 Pré-requisitos

* Node.js (v18+ recomendado)
* npm
* Docker & Docker Compose

---

## 🔧 Como rodar o projeto em desenvolvimento

### 1. Clone o repositório:

```bash
git clone https://github.com/elizbt/teste-iagiliza-fullstack.git
cd teste-iagiliza-fullstack
```

### 2. Subir o banco PostgreSQL com Docker:

```bash
docker compose up -d
```

Banco configurado com:

* Usuário: docker
* Senha: docker
* Banco: chatdb
* Porta exposta: 5433

### 3. Criar arquivo `.env` para o backend

Crie o arquivo `.env` na raiz do backend com:

```
DATABASE_URL="postgresql://docker:docker@localhost:5433/chatdb?schema=public"
JWT_SECRET="troque_para_um_valor_secreto"
PORT=3333
NODE_ENV=development
```

### 4. Instalar dependências do backend

```bash
npm install
```

### 5. Gerar cliente Prisma e aplicar migrações

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Iniciar o backend

```bash
npm run dev
```

API rodando em:

```
http://localhost:3333
```

---

## 🌐 Frontend — Next.js

### 7. Acessar a pasta do frontend

```bash
cd frontend
```

### 8. Instalar dependências

```bash
npm install
```

### 9. Rodar o frontend

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:3000
```

---

## 📜 Scripts úteis

### Backend

| Ação                | Comando                  |
| ------------------- | ------------------------ |
| Rodar servidor dev  | `npm run dev`            |
| Gerar Prisma Client | `npx prisma generate`    |
| Rodar migrações     | `npx prisma migrate dev` |
| Prisma Studio       | `npx prisma studio`      |

### Frontend

| Ação            | Comando         |
| --------------- | --------------- |
| Iniciar Next.js | `npm run dev`   |
| Build           | `npm run build` |
| Produção        | `npm run start` |
