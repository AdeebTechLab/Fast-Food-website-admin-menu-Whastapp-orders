# BiteHub

BiteHub is a React + TypeScript + Redux Toolkit restaurant ordering frontend.

## Tech Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- Lucide React

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub

```bash
git init
git add .
git commit -m "Prepare BiteHub for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Vercel

Import the GitHub repository into Vercel.

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

`vercel.json` is included so direct visits to `/menu`, `/offers`, `/admin`, and `/admin/login` are handled correctly by the Vite SPA.

## Important Admin Note

This project currently uses frontend-only demo authentication and browser localStorage. The admin username/password are therefore not a secure production authentication system. For a real restaurant deployment with protected admin data, replace this with a backend authentication/database service.
