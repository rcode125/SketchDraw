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
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  activeSidebarTab: 'tools' | 'layers' | 'properties'
  setActiveSidebarTab: (tab: 'tools' | 'layers' | 'properties') => void
}

export const useUiStore = create<UiState>((set) => ({
  canvasSize: { width: 1920, height: 1080 },
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  colorPickerCollapsed: false,
  setColorPickerCollapsed: (colorPickerCollapsed) => set({ colorPickerCollapsed }),
  toggleColorPicker: () => set((state) => ({ colorPickerCollapsed: !state.colorPickerCollapsed })),
  sidebarCollapsed: false,
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  activeSidebarTab: 'tools',
  setActiveSidebarTab: (activeSidebarTab) => set({ activeSidebarTab }),
}))
