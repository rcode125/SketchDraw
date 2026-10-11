import { useDrawingStore } from '../app/state/drawingStore'
import { useUiStore } from '../app/state/uiStore'

export const PropertiesPanel = () => {
  const tool = useDrawingStore((state) => state.tool)
  const color = useDrawingStore((state) => state.color)
  const size = useDrawingStore((state) => state.size)
  const setSize = useDrawingStore((state) => state.setSize)
  const strokes = useDrawingStore((state) => state.strokes)
  const canvasSize = useUiStore((state) => state.canvasSize)

  const totalPoints = strokes.reduce((sum, stroke) => sum + stroke.points.length, 0)

  return (
    <div className="properties-panel">
      <div className="panel">
        <div className="panel__header">Document</div>
        <div className="panel__content">
          <div className="property-group">
            <label className="label">Canvas Size</label>
            <div className="property-value">
              <span className="font-mono">
                {canvasSize.width} × {canvasSize.height} px
              </span>
            </div>
          </div>
          <div className="property-group">
            <label className="label">Strokes</label>
            <div className="property-value">
              <span className="font-mono">{strokes.length}</span>
            </div>
          </div>
          <div className="property-group">
            <label className="label">Total Points</label>
            <div className="property-value">
              <span className="font-mono">{totalPoints.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">Current Tool</div>
        <div className="panel__content">
          <div className="property-group">
            <label className="label">Tool</label>
            <div className="property-value">
              <span className="tool-badge">{tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
            </div>
          </div>

          {tool !== 'select' && tool !== 'pan' && (
            <>
              <div className="property-group">
                <label className="label">Color</label>
                <div className="property-value">
                  <div className="color-swatch-inline" style={{ backgroundColor: color }} />
                  <span className="font-mono">{color.toUpperCase()}</span>
                </div>
              </div>

              <div className="property-group">
                <label className="label">Size</label>
                <div className="property-value slider-row">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="slider"
                    aria-label="Brush size"
                  />
                  <span className="font-mono" style={{ minWidth: '40px', textAlign: 'right' }}>
                    {size} px
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">Tool Settings</div>
        <div className="panel__content">
          {tool === 'pencil' && (
            <div className="setting-group">
              <label className="setting-label">
                <input type="checkbox" defaultChecked />
                <span>Pressure Sensitivity</span>
              </label>
              <p className="setting-description">Vary line weight with pen pressure</p>
            </div>
          )}
          {tool === 'brush' && (
            <div className="setting-group">
              <label className="setting-label">
                <input type="checkbox" defaultChecked />
                <span>Smoothing</span>
              </label>
              <p className="setting-description">Apply stroke smoothing for cleaner lines</p>
            </div>
          )}
          {tool === 'charcoal' && (
            <div className="setting-group">
              <label className="setting-label">
                <input type="checkbox" defaultChecked />
                <span>Texture</span>
              </label>
              <p className="setting-description">Apply paper texture effect</p>
            </div>
          )}
          {tool === 'marker' && (
            <div className="setting-group">
              <label className="setting-label">
                <input type="checkbox" defaultChecked />
                <span>Blend Mode</span>
              </label>
              <p className="setting-description">Enable color blending on overlap</p>
            </div>
          )}
          {tool === 'eraser' && (
            <div className="setting-group">
              <label className="setting-label">
                <input type="checkbox" />
                <span>Erase All Layers</span>
              </label>
              <p className="setting-description">Erase through all layers at once</p>
            </div>
          )}
          {(tool === 'select' || tool === 'pan') && (
            <p className="setting-description">No additional settings for this tool</p>
          )}
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">Shortcuts</div>
        <div className="panel__content">
          <div className="shortcuts-grid">
            <div className="shortcut-item">
              <kbd>V</kbd> <span>Select Tool</span>
            </div>
            <div className="shortcut-item">
              <kbd>P</kbd> <span>Pencil</span>
            </div>
            <div className="shortcut-item">
              <kbd>B</kbd> <span>Brush</span>
            </div>
            <div className="shortcut-item">
              <kbd>C</kbd> <span>Charcoal</span>
            </div>
            <div className="shortcut-item">
              <kbd>M</kbd> <span>Marker</span>
            </div>
            <div className="shortcut-item">
              <kbd>E</kbd> <span>Eraser</span>
            </div>
            <div className="shortcut-item">
              <kbd>H</kbd> <span>Pan Tool</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd>+<kbd>Z</kbd> <span>Undo</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> <span>Redo</span>
            </div>
            <div className="shortcut-item">
              <kbd>Space</kbd>+<kbd>Drag</kbd> <span>Pan Canvas</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd>+<kbd>=</kbd> <span>Zoom In</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd>+<kbd>-</kbd> <span>Zoom Out</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd>+<kbd>0</kbd> <span>Fit to Screen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertiesPanel
