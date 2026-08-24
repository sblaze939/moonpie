# Moonpie 🌙

A birthday surprise website for Mansi — built with love.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no config needed
4. Set a custom domain containing "moonpie" in the Vercel dashboard

## Adding Photos

Open `src/components/Memories.tsx` and replace the placeholder `{/* TODO: Replace with actual photo */}` blocks with `<img src="..." alt="..." />` tags.

## Themes

Three themes available — Rose (default), Midnight, Sage. Toggle via the swatches in the top-right corner. Theme persists via localStorage.
