# Sweet Shop Management System (Scaffold)

This repository contains a full-stack starter implementation for the *Sweet Shop Management System* kata.
It includes:
- Backend: Node.js + TypeScript + Express + Prisma + PostgreSQL
- Frontend: React + Vite (minimal scaffold)
- Tests: Jest (backend), Vitest (frontend, optional)



## Structure
```
/backend
/frontend
```

## How to use
1. Copy backend/.env.example -> backend/.env and fill DATABASE_URL and JWT_SECRET.
2. Start Postgres DB (locally or Docker).
3. From /backend:
   - npm install
   - npx prisma generate
   - npx prisma migrate dev --name init
   - npm run dev

4. From /frontend:
   - npm install
   - npm run dev

## My AI Usage
I used ChatGPT to scaffold the project files and provide initial code for routes, controllers, and frontend components.
I manually reviewed and adjusted the code, and wrote the tests included in backend/tests.

## Download
You can download the scaffold zip provided with this message.

