# Production Deployment — TISS Incube Foundation

Stack: **Vercel** (frontend) · **Render** (API) · **Supabase** (Postgres + Storage).

---

## 1. Supabase (database + file storage)

1. Create a project at supabase.com. Note the project **ref** and database **password**.
2. **Database → Connect** copies two connection strings:
   - **Pooled** (Transaction, port `6543`) → `DATABASE_URL` (append `?pgbouncer=true`).
   - **Direct** (Session, port `5432`) → `DIRECT_URL`.
3. **Storage → New bucket** named `uploads`, marked **Public**.
4. **Project Settings → API**: copy the **Project URL** (`SUPABASE_URL`) and the **service_role** key (`SUPABASE_SERVICE_ROLE_KEY`). The service_role key is server-only — never expose it in the frontend.

## 2. Create the schema + admin (run once, locally)

Point a local `.env` at Supabase (`DATABASE_URL`, `DIRECT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`), then:

```bash
# from repo root
npx prisma migrate dev --name init      # creates tables on Supabase + commits a migration
cd server && npm run seed               # creates the admin + seed content
```

Commit the generated `prisma/migrations/` folder — Render replays it with `migrate deploy`.

## 3. Render (API)

1. New → **Blueprint**, point at this repo. Render reads `render.yaml`.
2. Set the `sync:false` env vars in the dashboard:
   `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `JWT_SECRET`, `JWT_REFRESH_SECRET`, `SERVER_URL` (the Render URL),
   `CLIENT_URL` (the Vercel URL), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
   - Generate each JWT secret: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
3. Deploy. Health check: `GET /api/health`.

## 4. Vercel (frontend)

1. New Project → import repo → **Root Directory = `client`** (Vercel reads `client/vercel.json`).
2. Env var: `VITE_API_URL = https://<your-api>.onrender.com` (no trailing `/api`).
3. Deploy. Copy the Vercel URL.

## 5. Wire the two together

- Put the **Vercel URL** into Render's `CLIENT_URL` (comma-separate to allow several, e.g. preview + prod).
- Put the **Render URL** into Vercel's `VITE_API_URL` and into Render's `SERVER_URL`.
- Redeploy both.

## 6. Security checklist (before going live)

- [ ] `NODE_ENV=production` on Render (blueprint sets it) → secure, httpOnly, SameSite cookies.
- [ ] HTTPS on both domains (automatic on Vercel + Render).
- [ ] Strong, unique `JWT_SECRET` + `JWT_REFRESH_SECRET`, set only in the host.
- [ ] Strong `ADMIN_PASSWORD`; rotate the one shared in chat.
- [ ] `CLIENT_URL` = exact frontend origin(s); no `*`.
- [ ] `uploads` bucket is the only public bucket; service_role key never in the client.
- [ ] `npm audit` clean on client + server.
- [ ] Supabase automatic backups enabled (paid tier for real data).

## Local development

Uploads fall back to local `./uploads` when `SUPABASE_*` is unset. The DB is now
Postgres — point `DATABASE_URL`/`DIRECT_URL` at Supabase (or a local Postgres);
SQLite is no longer used.
