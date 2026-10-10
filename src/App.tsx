import { useEffect, useState } from 'react'
import { SketchCanvas } from './features/canvas/SketchCanvas'
import type { AppInfo } from './shared/types/ipc'
import { useUiStore } from './app/state/uiStore'

const App = () => {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const { canvasSize } = useUiStore()

  useEffect(() => {
    void window.sketchdraw.getAppInfo().then(setAppInfo)
  }, [])

  return (
    <main className="workspace">
      <header className="workspace__header">
        <div>
          <h1>SketchDraw</h1>
          <p className="workspace__meta">
            {appInfo ? `${appInfo.platform} • v${appInfo.version}` : 'Desktop workspace'}
          </p>
        </div>
      </header>
      <section className="workspace__canvas">
        <SketchCanvas width={canvasSize.width} height={canvasSize.height} />
      </section>
    </main>
  )
}

export default App
