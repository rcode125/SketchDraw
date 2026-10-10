import { create } from 'zustand'

interface CanvasSize {
  width: number
  height: number
}

interface UiState {
  canvasSize: CanvasSize
  setCanvasSize: (size: CanvasSize) => void
}

export const useUiStore = create<UiState>((set) => ({
  canvasSize: { width: 1920, height: 1080 },
  setCanvasSize: (canvasSize) => set({ canvasSize }),
}))
