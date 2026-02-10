# ZenWeather (VS Code + Vite)

This repository is now set up as a standard React + TypeScript project that runs in VS Code with Vite.

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173`).

## Project structure

- `src/main.tsx` – app entry point
- `src/App.tsx` – top-level UI state and layout
- `src/components/*` – reusable weather UI components
- `src/types.ts` – shared TypeScript types
- `src/constants.ts` – mock weather data
- `tailwind.config.js` – custom animation/theme config
- `src/index.css` – Tailwind directives + custom glassmorphism styles

## VS Code tips

Install these extensions for best experience:
- **ESLint**
- **Tailwind CSS IntelliSense**
- **TypeScript and JavaScript Language Features** (built in)

You can launch from VS Code terminal with:

```bash
npm run dev
```
