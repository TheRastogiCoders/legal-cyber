# Lawsake Website

Professional website for Lawsake — cyber crime, data protection & financial fraud practice.

## Stack

- **Client:** React (Vite) + React Router
- **Server:** Node.js + Express (contact enquiry API)

## Theme

Dark royal blue (`#071428` / `#1e3c72`), grey, and white.

## Run locally

```bash
# from project root
npm install
npm install --prefix client
npm install --prefix server

npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:5000  

Contact form posts to `POST /api/contact` and stores enquiries in `server/data/enquiries.json`.

## Production

### Vercel (recommended for the website)

This repo is configured for Vercel via `vercel.json`:
- Installs and builds the Vite client
- Serves `client/dist`
- SPA rewrites for React Router
- Contact form API at `POST /api/contact`

Import the GitHub repo in Vercel, leave **Root Directory** empty (repo root), and deploy.

```bash
# or from CLI
npx vercel --prod
```

### Node/Express server

```bash
npm run build
npm start
```

The Express server serves the built client from `client/dist` when present.
