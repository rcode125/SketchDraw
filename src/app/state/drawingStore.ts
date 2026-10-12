import { create } from 'zustand'

export type DrawingTool = 'pencil' | 'brush' | 'charcoal' | 'marker' | 'eraser' | 'select' | 'pan'

export interface Point {
  x: number
  y: number
}

export interface Stroke {
  points: Point[]
  color: string // hex color
  size: number // radius in pixels
  tool: DrawingTool
}

export interface DrawingState {
  tool: DrawingTool
  color: string // current color
  size: number // current size
  strokes: Stroke[]
  currentStroke: {
    points: Point[]
    color: string
    size: number
    tool: DrawingTool
  } | null
  // actions
  setTool: (tool: DrawingTool) => void
  setColor: (color: string) => void
  setSize: (size: number) => void
  startStroke: (point: Point) => void
  addPoint: (point: Point) => void
  endStroke: () => void
  clearStrokes: () => void
  undoLastStroke: () => void
   redoLastStroke: () => void
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
  tool: 'pencil',
  color: '#000000',
  size: 5,
  strokes: [],
  currentStroke: null,
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  startStroke: (point) => {
    const state = get()
    set({
      currentStroke: {
        points: [point],
        color: state.color,
        size: state.size,
        tool: state.tool,
      },
    })
  },
  addPoint: (point) => {
    set((state) => {
      if (!state.currentStroke) {
        return state
      }
      return {
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, point],
        },
      }
    })
  },
  endStroke: () => {
    set((state) => {
      if (!state.currentStroke) {
        return state
      }
      const newStrokes = [...state.strokes, state.currentStroke]
      return { strokes: newStrokes, currentStroke: null }
    })
  },
  clearStrokes: () => {
    set({ strokes: [], currentStroke: null })
  },
  undoLastStroke: () => {
    set((state) => ({ strokes: state.strokes.slice(0, -1) }))
  },
  redoLastStroke: () => {
    // redo functionality not implemented yet
  },
}))
