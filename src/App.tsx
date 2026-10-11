import { useEffect, useState } from 'react'
import { SketchCanvas } from './features/canvas/SketchCanvas'
import { Toolbar } from './components/Toolbar'
import { Sidebar } from './components/Sidebar'
import { StatusBar } from './components/StatusBar'
import { useUiStore } from './app/state/uiStore'
import './App.css'

export const App = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 })
  const setCanvasSizeStore = useUiStore((state) => state.setCanvasSize)

  useEffect(() => {
    const handleResize = () => {
      const sidebarWidth = useUiStore.getState().sidebarCollapsed ? 56 : 280
      const width = window.innerWidth - sidebarWidth - 48
      const height = window.innerHeight - 56 - 32 - 48
      setCanvasSize({ width: Math.max(400, width), height: Math.max(300, height) })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setCanvasSizeStore(canvasSize)
  }, [canvasSize, setCanvasSizeStore])

  return (
    <div className="app">
      <Toolbar />
      <div className="app__main">
        <Sidebar />
        <SketchCanvas width={canvasSize.width} height={canvasSize.height} />
      </div>
      <StatusBar />
    </div>
  )
}

export default App
