# Deploying to Vercel

## Project settings (important)

1. **Root Directory**: Leave **empty** (use the repo root). Do not set it to `app`.
2. **Framework Preset**: Other (or leave as auto; `vercel.json` overrides).
3. **Build Command / Output**: Leave default; they are set in `vercel.json`.

## If you see 404 after deploy

1. In Vercel → your project → **Deployments** → open the latest deployment.
2. Check **Building** and **Logs**: confirm the build finished without errors.
3. If the build failed, fix the error (often missing deps or TypeScript). Then push and redeploy.
4. In **Project Settings → General**, ensure **Root Directory** is blank (not `app`).

## What this repo’s config does

- `installCommand`: `cd app && npm install` (installs in `app`)
- `buildCommand`: `cd app && npm run build` (builds the Vite app)
- `outputDirectory`: `app/dist` (serves the built files)
- `rewrites`: all routes serve `index.html` (SPA, no 404 on refresh)
