# MovieLand Auth (React + Express + Aiven MySQL)

## Run locally
1. Install dependencies:
```bash
npm install
npm run install:all
```

2. Create backend env:
```bash
copy .env.example server/.env
```
Then set `DB_PASSWORD`.

3. Run app:
```bash
npm run dev
```

- Frontend: `http://localhost:5173` (or 5174 if occupied)
- Backend: `http://localhost:5000`

## API
- `POST /api/register`
- `POST /api/login`

## DB table
The backend auto-creates table `movieusers` at startup.

## Login success redirect
On successful login, frontend redirects to:
`https://movieland-omega-steel.vercel.app/`

## Deploy on Vercel
1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Add these Vercel Environment Variables:
`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL`, `DB_SSL_REJECT_UNAUTHORIZED`
4. Set values:
`DB_HOST=mysql-1d11440d-movieland.i.aivencloud.com`
`DB_PORT=17674`
`DB_USER=avnadmin`
`DB_NAME=defaultdb`
`DB_SSL=true`
`DB_SSL_REJECT_UNAUTHORIZED=false`
5. Deploy.

Vercel serverless routes are:
- `POST /api/register`
- `POST /api/login`
- `GET /api/health`
