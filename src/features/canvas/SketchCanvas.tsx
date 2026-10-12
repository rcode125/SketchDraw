import { useRef, useState, useCallback } from 'react'
import { useUiStore } from '../../app/state/uiStore'
import { useCanvasSurface } from './useCanvasSurface'

interface SketchCanvasProps {
  width: number
  height: number
}

export const SketchCanvas = ({ width, height }: SketchCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const { zoom, pan, setZoom, setPan, zoomIn, zoomOut, resetZoom, fitToScreen } = useUiStore(
    (state) => ({
      zoom: state.zoom,
      pan: state.pan,
      setZoom: state.setZoom,
      setPan: state.setPan,
      zoomIn: state.zoomIn,
      zoomOut: state.zoomOut,
      resetZoom: state.resetZoom,
      fitToScreen: state.fitToScreen,
    }),
  )
  const [showRulers] = useState(true)

  useCanvasSurface(canvasRef, { width, height })

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const rect = wrapperRef.current?.getBoundingClientRect()
        if (!rect) return

        const mouseX = e.clientX - rect.left - pan.x
        const mouseY = e.clientY - rect.top - pan.y

        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
        const newZoom = Math.max(0.1, Math.min(5, zoom * zoomFactor))

        const newPanX = e.clientX - rect.left - mouseX * (newZoom / zoom)
        const newPanY = e.clientY - rect.top - mouseY * (newZoom / zoom)

        setZoom(newZoom)
        setPan({ x: newPanX, y: newPanY })
      } else {
        e.preventDefault()
        setPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY })
      }
    },
    [pan, zoom, setPan, setZoom],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = wrapperRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = Math.round((e.clientX - rect.left - pan.x) / zoom)
      const y = Math.round((e.clientY - rect.top - pan.y) / zoom)

      // Cursor position could be passed to status bar via store if needed
      void x
      void y
    },
    [pan, zoom],
  )

  const generateRulerMarks = (length: number) => {
    const marks = []
    const majorStep = 100
    const minorStep = 10

    for (let i = 0; i <= length; i += minorStep) {
      const isMajor = i % majorStep === 0
      marks.push({
        position: i,
        isMajor,
        label: isMajor ? `${i}` : '',
      })
    }
    return marks
  }

  const horizontalMarks = generateRulerMarks(width)
  const verticalMarks = generateRulerMarks(height)

  return (
    <div
      ref={wrapperRef}
      className="app__canvas-area"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      style={{ touchAction: 'none' }}
    >
      <div className="app__canvas-viewport">
        <div
          className="app__canvas-shell"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <canvas ref={canvasRef} aria-label="Sketch canvas" />
        </div>
      </div>

      {showRulers && zoom > 0.3 && (
        <div
          className="app__canvas-rulers"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          <div
            className="app__canvas-ruler app__canvas-ruler--horizontal"
            style={{ width: `${width}px` }}
          >
            {horizontalMarks.map((mark, index) => (
              <div
                key={index}
                className={`app__canvas-ruler-mark ${mark.isMajor ? 'app__canvas-ruler-mark--major' : 'app__canvas-ruler-mark--minor'}`}
                style={{ left: `${mark.position}px` }}
              />
            ))}
            {horizontalMarks
              .filter((m) => m.isMajor)
              .map((mark, index) => (
                <div
                  key={index}
                  className="app__canvas-ruler-label app__canvas-ruler-label--horizontal"
                  style={{ left: `${mark.position}px` }}
                >
                  {mark.label}
                </div>
              ))}
          </div>

          <div
            className="app__canvas-ruler app__canvas-ruler--vertical"
            style={{ height: `${height}px` }}
          >
            {verticalMarks.map((mark, index) => (
              <div
                key={index}
                className={`app__canvas-ruler-mark ${mark.isMajor ? 'app__canvas-ruler-mark--vertical-major' : 'app__canvas-ruler-mark--vertical-minor'}`}
                style={{ top: `${mark.position}px` }}
              />
            ))}
            {verticalMarks
              .filter((m) => m.isMajor)
              .map((mark, index) => (
                <div
                  key={index}
                  className="app__canvas-ruler-label app__canvas-ruler-label--vertical"
                  style={{ top: `${mark.position}px` }}
                >
                  {mark.label}
                </div>
              ))}
          </div>

          <div
            className="app__canvas-ruler app__canvas-ruler--horizontal app__canvas-ruler--corner"
            style={{
              width: '28px',
              height: '28px',
              top: '-28px',
              left: '-28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.625rem',
              color: 'var(--color-text-dim)',
            }}
          >
            0,0
          </div>
        </div>
      )}

      <div className="app__canvas-controls">
        <button
          className="app__canvas-control-btn"
          onClick={zoomOut}
          aria-label="Zoom out"
          title="Zoom out (Ctrl+-)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <div className="app__canvas-zoom" aria-label={`Zoom level: ${Math.round(zoom * 100)}%`}>
          {Math.round(zoom * 100)}%
        </div>
        <button
          className="app__canvas-control-btn"
          onClick={zoomIn}
          aria-label="Zoom in"
          title="Zoom in (Ctrl+=)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button
          className="app__canvas-control-btn"
          onClick={resetZoom}
          aria-label="Reset zoom"
          title="Reset zoom (Ctrl+0)"
        >
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
        </button>
        <button
          className="app__canvas-control-btn"
          onClick={fitToScreen}
          aria-label="Fit to screen"
          title="Fit to screen (Ctrl+Shift+0)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SketchCanvas
