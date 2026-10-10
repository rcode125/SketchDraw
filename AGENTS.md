# SketchDraw Agent Instructions

## Project Overview
Cross-platform desktop drawing app: Electron + React + Vite + TypeScript + Zustand.
Phase 1 architecture only (shell, state foundation, test baseline).

## Critical Commands
```bash
# Development
npm run dev                 # Run Electron + Vite dev server

# Verification (run in order)
npm run lint                # ESLint (flat config, max-warnings=0)
npm run typecheck           # tsc -b (project references)
npm run test                # vitest run

# Build & Package
npm run build               # Build for current platform (typecheck + renderer + electron-builder)
npm run build:linux         # Linux AppImage + deb
npm run build:win           # Windows NSIS + portable

# Formatting
npm run format              # Check with Prettier
npm run format:write        # Apply Prettier formatting
```

## Architecture
```
electron/
  main/index.ts       # BrowserWindow lifecycle, secure webPreferences
  main/ipc.ts         # Validated IPC handlers (minimal)
  preload/index.ts    # Typed API exposed to renderer via contextBridge
src/
  app/state/          # Zustand stores (uiStore, drawingStore)
  core/document/      # Document schema + tests
  features/canvas/    # Canvas components + hooks
  shared/types/ipc.ts # Shared TypeScript types for IPC
```

## Key Config Files
- `vite.config.ts` - Vite + `vite-plugin-electron/simple` (entry: electron/main/index.ts, preload: electron/preload/index.ts)
- `tsconfig.json` - Project references to `tsconfig.app.json` (renderer) and `tsconfig.node.json` (main/preload/vite config)
- `eslint.config.js` - Flat config: TypeScript strict, React Hooks, React Refresh, Prettier
- `.prettierrc.json` - `semi: false`, `singleQuote: true`, `trailingComma: all`, `printWidth: 100`
- `electron-builder` config in `package.json` build section

## TypeScript Strictness
- `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
- `noUnusedLocals/Parameters: true`, `erasableSyntaxOnly: true`, `verbatimModuleSyntax: true`
- Project references: run `tsc -b` for full typecheck

## Testing
- Vitest with jsdom, `@testing-library/react`, `@testing-library/jest-dom`
- Tests colocated: `*.test.ts(x)`
- Run single test: `npx vitest run src/core/document/schema.test.ts`

## CI
GitHub Actions (`.github/workflows/ci.yml`): runs lint → typecheck → test on Ubuntu + Windows latest, Node 22.

## Platform Targets
- Windows: `nsis`, `portable`
- Linux: `AppImage`, `deb`
- macOS: not configured

## Gotchas
- `npm run dev` requires both Vite and Electron; `VITE_DEV_SERVER_URL` injected by `vite-plugin-electron`
- Main process uses ESM (`"type": "module"` in package.json)
- Preload bridge exposes `window.sketchdraw.getAppInfo()` typed via `src/shared/types/ipc.ts`
- Build output: `dist/` (renderer), `dist-electron/` (main/preload), `release/` (packaged)