import { useEffect, type RefObject } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useDrawingStore, type DrawingTool, type Point } from '../../app/state/drawingStore'

interface UseCanvasSurfaceOptions {
  width: number
  height: number
  backgroundColor?: string
}

/**
 * Hook that sets up the canvas surface and handles drawing interactions.
 * Manages canvas size, background, and pointer events for drawing.
 */
export const useCanvasSurface = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { width, height, backgroundColor = '#ffffff' }: UseCanvasSurfaceOptions,
) => {
  // Subscribe to the drawing store for strokes, currentStroke, and the methods we need.
  const { strokes, currentStroke, startStroke, addPoint, endStroke } = useDrawingStore(
    useShallow((state) => ({
      strokes: state.strokes,
      currentStroke: state.currentStroke,
      startStroke: state.startStroke,
      addPoint: state.addPoint,
      endStroke: state.endStroke,
    })),
  )

  // Set up canvas size and background when dimensions or background color change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = Math.floor(width * pixelRatio)
    canvas.height = Math.floor(height * pixelRatio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
  }, [backgroundColor, canvasRef, height, width])

  // Redraw the entire canvas whenever the drawing state changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear the canvas (we'll redraw everything)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Redraw the background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const drawStroke = (stroke: {
      points: Point[]
      color: string
      size: number
      tool: DrawingTool
    }) => {
      ctx.strokeStyle = stroke.color
      const baseWidth = stroke.size * 2

      switch (stroke.tool) {
        case 'pencil':
          ctx.lineCap = 'butt'
          ctx.lineJoin = 'miter'
          ctx.lineWidth = Math.max(1, baseWidth * 0.5)
          break
        case 'brush':
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.lineWidth = baseWidth
          break
        case 'charcoal':
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.lineWidth = baseWidth * 1.5
          ctx.globalAlpha = 0.6
          break
        case 'marker':
          ctx.lineCap = 'square'
          ctx.lineJoin = 'miter'
          ctx.lineWidth = baseWidth * 2
          ctx.globalAlpha = 0.8
          break
        case 'eraser':
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.lineWidth = baseWidth * 3
          ctx.globalCompositeOperation = 'destination-out'
          break
      }

      const points = stroke.points
      if (points.length < 2) return

      const firstPoint = points[0]
      if (!firstPoint) return

      ctx.beginPath()
      ctx.moveTo(firstPoint.x, firstPoint.y)
      for (const point of points.slice(1)) {
        ctx.lineTo(point.x, point.y)
      }
      ctx.stroke()

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    for (const stroke of strokes) {
      drawStroke(stroke)
    }

    if (currentStroke) {
      drawStroke(currentStroke)
    }
  }, [strokes, currentStroke, backgroundColor, canvasRef])

  // Handle pointer events for drawing
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      // Only respond to primary pointer (left mouse, pen tip, etc.)
      if (event.button !== 0) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      startStroke({ x, y })
    }

    const handlePointerMove = (event: PointerEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const state = useDrawingStore.getState()
      if (!state.currentStroke) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      state.addPoint({ x, y })
    }

    const handlePointerUp = () => {
      useDrawingStore.getState().endStroke()
    }

    const handlePointerCancel = () => {
      useDrawingStore.getState().endStroke()
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('pointerdown', handlePointerDown)
      canvas.addEventListener('pointermove', handlePointerMove)
      canvas.addEventListener('pointerup', handlePointerUp)
      canvas.addEventListener('pointercancel', handlePointerCancel)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('pointerdown', handlePointerDown)
        canvas.removeEventListener('pointermove', handlePointerMove)
        canvas.removeEventListener('pointerup', handlePointerUp)
        canvas.removeEventListener('pointercancel', handlePointerCancel)
      }
    }
  }, [canvasRef, startStroke, addPoint, endStroke])
}
