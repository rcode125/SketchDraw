import { useDrawingStore } from '../app/state/drawingStore'

export const LayersPanel = () => {
  const strokes = useDrawingStore((state) => state.strokes)
  const clearStrokes = useDrawingStore((state) => state.clearStrokes)

  const layers = strokes.map((stroke, index) => ({
    id: index,
    name: `${stroke.tool.charAt(0).toUpperCase() + stroke.tool.slice(1)} Stroke`,
    color: stroke.color,
    tool: stroke.tool,
    points: stroke.points.length,
    visible: true,
    locked: false,
  }))

  if (layers.length === 0) {
    return (
      <div className="layers-panel">
        <div className="layers-empty">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="48"
            height="48"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <p>No layers yet</p>
          <span>Start drawing to create layers</span>
        </div>
      </div>
    )
  }

  return (
    <div className="layers-panel">
      <div className="layers-list" role="list" aria-label="Drawing layers">
        {layers
          .slice()
          .reverse()
          .map((layer) => (
            <div
              key={layer.id}
              className="layer-item"
              role="listitem"
              style={{ borderLeftColor: layer.color }}
            >
              <div className="layer-item-main">
                <button
                  className="layer-visibility"
                  aria-label={layer.visible ? 'Hide layer' : 'Show layer'}
                  onClick={() => {}}
                >
                  {layer.visible ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="16"
                      height="16"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="16"
                      height="16"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
                <button
                  className="layer-lock"
                  aria-label={layer.locked ? 'Unlock layer' : 'Lock layer'}
                  onClick={() => {}}
                >
                  {layer.locked ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="14"
                      height="14"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="14"
                      height="14"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                </button>
                <div className="layer-info">
                  <span className="layer-name">{layer.name}</span>
                  <span className="layer-meta">
                    {layer.points} pts • {layer.tool}
                  </span>
                </div>
              </div>
              <div className="layer-color-indicator" style={{ backgroundColor: layer.color }} />
            </div>
          ))}
      </div>

      <div className="layers-actions">
        <button
          className="btn btn--ghost btn--sm"
          onClick={clearStrokes}
          disabled={layers.length === 0}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="14"
            height="14"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Clear All
        </button>
      </div>
    </div>
  )
}

export default LayersPanel
