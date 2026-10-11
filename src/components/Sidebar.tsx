import { useUiStore } from '../app/state/uiStore'
import { ToolPicker } from '../features/canvas/ToolPicker'
import { ColorPicker } from '../features/canvas/ColorPicker'
import { LayersPanel } from './LayersPanel'
import { PropertiesPanel } from './PropertiesPanel'

export const Sidebar = () => {
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed)
  const activeSidebarTab = useUiStore((state) => state.activeSidebarTab)
  const setActiveSidebarTab = useUiStore((state) => state.setActiveSidebarTab)

  if (sidebarCollapsed) {
    return (
      <aside className="app__sidebar app__sidebar--collapsed" aria-label="Sidebar (collapsed)">
        <div className="app__sidebar-tabs" role="tablist" aria-label="Sidebar panels">
          <button
            role="tab"
            aria-selected={activeSidebarTab === 'tools'}
            onClick={() => setActiveSidebarTab('tools')}
            className={`app__sidebar-tab ${activeSidebarTab === 'tools' ? 'app__sidebar-tab--active' : ''} app__sidebar-tab--collapsed`}
            aria-label="Tools"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
            <span className="app__sidebar-tab-label">Tools</span>
          </button>
          <button
            role="tab"
            aria-selected={activeSidebarTab === 'layers'}
            onClick={() => setActiveSidebarTab('layers')}
            className={`app__sidebar-tab ${activeSidebarTab === 'layers' ? 'app__sidebar-tab--active' : ''} app__sidebar-tab--collapsed`}
            aria-label="Layers"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span className="app__sidebar-tab-label">Layers</span>
          </button>
          <button
            role="tab"
            aria-selected={activeSidebarTab === 'properties'}
            onClick={() => setActiveSidebarTab('properties')}
            className={`app__sidebar-tab ${activeSidebarTab === 'properties' ? 'app__sidebar-tab--active' : ''} app__sidebar-tab--collapsed`}
            aria-label="Properties"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="app__sidebar-tab-label">Properties</span>
          </button>
        </div>
      </aside>
    )
  }

  return (
    <aside className="app__sidebar" aria-label="Sidebar">
      <div className="app__sidebar-tabs" role="tablist" aria-label="Sidebar panels">
        <button
          role="tab"
          aria-selected={activeSidebarTab === 'tools'}
          onClick={() => setActiveSidebarTab('tools')}
          className={`app__sidebar-tab ${activeSidebarTab === 'tools' ? 'app__sidebar-tab--active' : ''}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
          <span className="app__sidebar-tab-label">Tools</span>
        </button>
        <button
          role="tab"
          aria-selected={activeSidebarTab === 'layers'}
          onClick={() => setActiveSidebarTab('layers')}
          className={`app__sidebar-tab ${activeSidebarTab === 'layers' ? 'app__sidebar-tab--active' : ''}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span className="app__sidebar-tab-label">Layers</span>
        </button>
        <button
          role="tab"
          aria-selected={activeSidebarTab === 'properties'}
          onClick={() => setActiveSidebarTab('properties')}
          className={`app__sidebar-tab ${activeSidebarTab === 'properties' ? 'app__sidebar-tab--active' : ''}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="app__sidebar-tab-label">Properties</span>
        </button>
      </div>

      <div className="app__sidebar-panel" role="tabpanel" aria-label={activeSidebarTab}>
        {activeSidebarTab === 'tools' && (
          <>
            <ToolPicker />
            <div className="divider" />
            <ColorPicker />
          </>
        )}
        {activeSidebarTab === 'layers' && <LayersPanel />}
        {activeSidebarTab === 'properties' && <PropertiesPanel />}
      </div>
    </aside>
  )
}

export default Sidebar
