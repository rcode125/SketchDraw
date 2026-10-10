import { useEffect, useState } from 'react'
import { SketchCanvas } from './features/canvas/SketchCanvas'
import { ColorPicker } from './features/canvas/ColorPicker'
import { useUiStore } from './app/state/uiStore'
import './App.css'

export const App = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 })
  const setCanvasSizeStore = useUiStore((state) => state.setCanvasSize)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 40
      const height = window.innerHeight - 120
      setCanvasSize({ width, height })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setCanvasSizeStore(canvasSize)
  }, [canvasSize, setCanvasSizeStore])

  return (
    <div className="workspace">
      <header className="workspace__header">
        <h1>SketchDraw</h1>
      </header>
      <div className="workspace__canvas">
        <SketchCanvas width={canvasSize.width} height={canvasSize.height} />
      </div>
      <ColorPicker />
    </div>
  )
}

export default App
