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
  // Zoom and pan state
  zoom: number
  pan: { x: number; y: number }
  setZoom: (zoom: number) => void
  setPan: (pan: { x: number; y: number }) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  fitToScreen: () => void
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
  // Zoom and pan defaults
  zoom: 1,
  pan: { x: 0, y: 0 },
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
  zoomIn: () => set((state) => ({ zoom: Math.min(5, state.zoom * 1.2) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(0.1, state.zoom / 1.2) })),
  resetZoom: () => set({ zoom: 1, pan: { x: 0, y: 0 } }),
  fitToScreen: () => {
    // Simple fit: reset zoom and center
    set({ zoom: 1, pan: { x: 0, y: 0 } })
  },
}))

