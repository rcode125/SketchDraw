import { useDrawingStore } from '../../app/state/drawingStore'

const tools = [
  { id: 'pencil', label: 'Pencil', description: 'Hard, precise lines' },
  { id: 'brush', label: 'Brush', description: 'Soft, rounded strokes' },
  { id: 'charcoal', label: 'Charcoal', description: 'Textured, expressive' },
  { id: 'marker', label: 'Marker', description: 'Bold, opaque strokes' },
  { id: 'eraser', label: 'Eraser', description: 'Remove strokes' },
] as const

export const ToolPicker = () => {
  const tool = useDrawingStore((state) => state.tool)
  const setTool = useDrawingStore((state) => state.setTool)

  return (
    <div className="tool-picker" role="radiogroup" aria-label="Drawing tools">
      {tools.map(({ id, label, description }) => (
        <button
          key={id}
          className={`tool-picker__button ${tool === id ? 'tool-picker__button--active' : ''}`}
          onClick={() => setTool(id as (typeof tools)[number]['id'])}
          role="radio"
          aria-checked={tool === id}
          aria-label={`${label}: ${description}`}
          title={`${label}: ${description}`}
        >
          <span className="tool-picker__icon" data-tool={id} />
          <span className="tool-picker__label">{label}</span>
        </button>
      ))}
    </div>
  )
}
