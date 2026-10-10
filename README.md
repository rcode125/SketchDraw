# SketchDraw

SketchDraw is a cross-platform desktop drawing application built with Electron, React, Vite, and TypeScript.  
It is an original open-source project inspired by the workflow of classic desktop sketching software.

## Current Status

This repository started empty and is now initialized with **Phase 1** architecture:

- Electron desktop shell (secure preload bridge)
- React + Vite renderer
- Strict TypeScript setup
- Zustand state foundation
- Vitest test baseline
- ESLint + Prettier setup
- electron-builder packaging targets for Windows and Linux
- GitHub Actions CI for Ubuntu + Windows

Core drawing features (brushes, layers, save format, undo/redo, navigation) are in upcoming phases.

## Supported Operating Systems

- Windows 10/11 (x64)
- Ubuntu Linux (LTS)

## Technology Stack

- TypeScript
- Electron
- React
- Vite
- Zustand
- Vitest
- electron-builder

## Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Run Electron app in development mode
- `npm run typecheck` - Run TypeScript project checks
- `npm run lint` - Run ESLint
- `npm run format` - Check formatting with Prettier
- `npm run format:write` - Apply Prettier formatting
- `npm run test` - Run unit tests
- `npm run build` - Build and package app (current host)
- `npm run build:win` - Build Windows installer + portable target
- `npm run build:linux` - Build Linux AppImage + deb packages

## Packaging Notes

Cross-platform packaging is configured via electron-builder:

- Windows targets: `nsis`, `portable`
- Linux targets: `AppImage`, `deb`

For best results, build each platform on its native OS or in CI with matching runners.

## Architecture (Phase 1)

```text
electron/
  main/
    index.ts         # BrowserWindow lifecycle + secure webPreferences
    ipc.ts           # Minimal validated IPC handlers
  preload/
    index.ts         # Typed API exposed to renderer
src/
  app/state/
    uiStore.ts       # Zustand UI state
  core/document/
    schema.ts        # Initial document schema model
    schema.test.ts   # Unit tests
  features/canvas/
    SketchCanvas.tsx
    useCanvasSurface.ts
  shared/types/
    ipc.ts
```

## Testing

```bash
npm run test
```

## CI

GitHub Actions runs lint, typecheck, and tests on:

- Ubuntu latest
- Windows latest

## Screenshots

Screenshots will be added once the drawing UI is feature-complete.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Run typecheck, lint, and tests locally.
4. Open a pull request.

## Known Limitations

- Drawing interactions are not yet implemented.
- Layer editing and document persistence are not yet implemented.
- Export/import workflows are not yet implemented.

## License

MIT. See [LICENSE](./LICENSE).
