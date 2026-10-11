import { useState } from 'react'
import { useDrawingStore } from '../app/state/drawingStore'
import { useUiStore } from '../app/state/uiStore'

export const StatusBar = () => {
  const tool = useDrawingStore((state) => state.tool)
  const color = useDrawingStore((state) => state.color)
  const size = useDrawingStore((state) => state.size)
  const strokes = useDrawingStore((state) => state.strokes)
  const canvasSize = useUiStore((state) => state.canvasSize)
  const [cursorPos] = useState({ x: 0, y: 0 })
  const [zoom] = useState(100)

  return (
    <footer className="app__statusbar" role="status" aria-label="Application status">
      <div className="app__statusbar-left">
        <div className="app__statusbar-item">
          <span className="tool-badge">{tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
        </div>

        <div className="app__statusbar-separator" />

        <div className="app__statusbar-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span style={{ color: color }}>{color.toUpperCase()}</span>
        </div>

        <div className="app__statusbar-separator" />

        <div className="app__statusbar-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>{size} px</span>
        </div>

        <div className="app__statusbar-separator" />

        <div className="app__statusbar-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>{strokes.length} strokes</span>
        </div>
      </div>

      <div className="app__statusbar-right">
        <div className="app__statusbar-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          <span>
            {canvasSize.width} × {canvasSize.height}
          </span>
        </div>

        <div className="app__statusbar-separator" />

        <div className="app__statusbar-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>{zoom}%</span>
        </div>

        <div className="app__statusbar-separator" />

        <div className="app__statusbar-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>
            {cursorPos.x}, {cursorPos.y}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default StatusBar
