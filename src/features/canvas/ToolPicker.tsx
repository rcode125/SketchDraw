import { useDrawingStore } from '../../app/state/drawingStore'
import { useUiStore } from '../../app/state/uiStore'
import './ToolPicker.css'

const tools = [
  {
    id: 'pencil' as const,
    label: 'Pencil',
    shortcut: 'P',
    description: 'Hard, precise lines',
    icon: (
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
    ),
  },
  {
    id: 'brush' as const,
    label: 'Brush',
    shortcut: 'B',
    description: 'Soft, rounded strokes',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2.3 0 4.4-.9 6-2.4L22 22l-1.5-1.5c-1.5 1.6-3.6 2.5-6 2.5C6.5 22 2 17.5 2 12S6.5 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'charcoal' as const,
    label: 'Charcoal',
    shortcut: 'C',
    description: 'Textured, expressive',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M8 10s1.5 2 4 2 4-2 4-2" />
        <path d="M8 18s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
  },
  {
    id: 'marker' as const,
    label: 'Marker',
    shortcut: 'M',
    description: 'Bold, opaque strokes',
    icon: (
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
        <path d="M8 14h8M8 10h8M8 18h8" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'eraser' as const,
    label: 'Eraser',
    shortcut: 'E',
    description: 'Remove strokes',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 20H7L2 15l9-9 9 9-4 4z" />
        <path d="M15 7l5 5" />
      </svg>
    ),
  },
  {
    id: 'select' as const,
    label: 'Select',
    shortcut: 'V',
    description: 'Select and move strokes',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3l18 18" />
        <path d="M3 21l18-18" />
      </svg>
    ),
  },
  {
    id: 'pan' as const,
    label: 'Pan',
    shortcut: 'H',
    description: 'Pan the canvas',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
] as const

type ToolId = (typeof tools)[number]['id']

export const ToolPicker = () => {
  const tool = useDrawingStore((state) => state.tool)
  const setTool = useDrawingStore((state) => state.setTool)
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed)

  return (
    <div className="tool-picker" role="radiogroup" aria-label="Drawing tools">
      {tools.map(({ id, label, shortcut, description, icon }) => (
        <button
          key={id}
          className={`tool-picker__button ${tool === id ? 'tool-picker__button--active' : ''}`}
          onClick={() => setTool(id as ToolId)}
          role="radio"
          aria-checked={tool === id}
          aria-label={`${label}${shortcut ? ` (${shortcut})` : ''}: ${description}`}
          title={`${label}${shortcut ? ` (${shortcut})` : ''}: ${description}`}
        >
          <span className="tool-picker__icon" aria-hidden="true">
            {icon}
          </span>
          {!sidebarCollapsed && <span className="tool-picker__label">{label}</span>}
          {!sidebarCollapsed && shortcut && (
            <span className="tool-picker__shortcut">{shortcut}</span>
          )}
        </button>
      ))}
    </div>
  )
}

export default ToolPicker
