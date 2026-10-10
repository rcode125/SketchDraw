/// <reference types="vite/client" />

import type { SketchdrawApi } from './shared/types/ipc'

declare global {
  interface Window {
    sketchdraw: SketchdrawApi
  }
}
