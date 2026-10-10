import { create } from 'zustand'

interface CanvasSize {
  width: number
  height: number
}

interface UiState {
  canvasSize: CanvasSize
  setCanvasSize: (size: CanvasSize) => void
  colorPickerCollapsed: boolean
  setColorPickerCollapsed: (collapsed: boolean) => void
  toggleColorPicker: () => void
}

export const useUiStore = create<UiState>((set) => ({
  canvasSize: { width: 1920, height: 1080 },
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  colorPickerCollapsed: false,
  setColorPickerCollapsed: (colorPickerCollapsed) => set({ colorPickerCollapsed }),
  toggleColorPicker: () => set((state) => ({ colorPickerCollapsed: !state.colorPickerCollapsed })),
}))
