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

3. Start frontend + backend together:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints
- `POST /api/register`
- `POST /api/login`

## Security Notes
- Passwords are hashed with `bcrypt` before insert.
- Login compares plain password against stored hash.
- Uses prepared statements (`?`) for SQL injection prevention.
- No secrets are hardcoded; credentials come from `.env`.
- SSL is enabled for Aiven MySQL connection.