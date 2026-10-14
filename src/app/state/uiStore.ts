import { create } from 'zustand'

export const MIN_ZOOM = 0.1
export const MAX_ZOOM = 5
const ZOOM_MULTIPLIER = 1.2

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
  zoomIn: () => set((state) => ({ zoom: Math.min(MAX_ZOOM, state.zoom * ZOOM_MULTIPLIER) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(MIN_ZOOM, state.zoom / ZOOM_MULTIPLIER) })),
  resetZoom: () => set({ zoom: 1, pan: { x: 0, y: 0 } }),
  fitToScreen: () => {
    set((state) => {
      const { width, height } = state.canvasSize
      const scale = Math.min(window.innerWidth / width, window.innerHeight / height)
      const panX = (window.innerWidth - width * scale) / 2
      const panY = (window.innerHeight - height * scale) / 2

      const clampedScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale))
      return { zoom: clampedScale, pan: { x: panX, y: panY } }
    })
  },
}))





