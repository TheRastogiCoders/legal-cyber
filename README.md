# Legal-Cyber Website

Professional website for Legal-Cyber — cyber crime, data protection & financial fraud practice.

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

```bash
npm run build
npm start
```

The Express server serves the built client from `client/dist` when present.
