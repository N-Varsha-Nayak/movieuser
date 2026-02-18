# Full-Stack Authentication System (React + Express + MySQL)

## Stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MySQL (Aiven Cloud with SSL)

## Project Structure
```
movieuser/
  client/
    src/
      pages/
        LoginPage.jsx
        RegisterPage.jsx
      api.js
      App.jsx
      main.jsx
      styles.css
    index.html
    package.json
    vite.config.js
  server/
    src/
      config/
        db.js
      controllers/
        authController.js
      routes/
        authRoutes.js
      utils/
        validators.js
      index.js
    sql/
      init.sql
    package.json
  .env.example
  .gitignore
  package.json
  README.md
```

## Setup
1. Install dependencies:
```bash
npm install
npm run install:all
```

2. Create backend env file:
```bash
copy .env.example server/.env
```
Then set `DB_PASSWORD` in `server/.env`.

3. Create frontend env file:
```bash
copy client/.env.example client/.env
```
For local dev keep:
`VITE_API_BASE_URL=http://localhost:5000/api`

4. Start frontend + backend together:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Vercel Frontend + Remote Backend
- Set `VITE_API_BASE_URL` in Vercel to your deployed backend URL, for example:
`https://your-backend-domain.com/api`
- In backend env (`server/.env` or deployment env), set `CLIENT_URL` to include your frontend origins:
`http://localhost:5173,http://localhost:5174,https://your-vercel-app.vercel.app`

## API Endpoints
- `POST /api/register`
- `POST /api/login`

## Security Notes
- Passwords are hashed with `bcrypt` before insert.
- Login compares plain password against stored hash.
- Uses prepared statements (`?`) for SQL injection prevention.
- No secrets are hardcoded; credentials come from `.env`.
- SSL is enabled for Aiven MySQL connection.
