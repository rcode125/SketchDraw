import { useRef } from 'react'
import { useCanvasSurface } from './useCanvasSurface'

interface SketchCanvasProps {
  width: number
  height: number
}

export const SketchCanvas = ({ width, height }: SketchCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useCanvasSurface(canvasRef, { width, height })

  return (
    <div className="canvas-shell" aria-label="Drawing canvas container">
      <canvas ref={canvasRef} aria-label="Sketch canvas" />
    </div>
  )
}
