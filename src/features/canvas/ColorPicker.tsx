import { useDrawingStore } from '../../app/state/drawingStore'
import { useUiStore } from '../../app/state/uiStore'
import './ColorPicker.css'

const PRESET_COLORS = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff8800',
  '#8800ff',
  '#884400',
  '#008844',
  '#880044',
  '#448800',
  '#004488',
]

export const ColorPicker = () => {
  const color = useDrawingStore((state) => state.color)
  const setColor = useDrawingStore((state) => state.setColor)
  const collapsed = useUiStore((state) => state.colorPickerCollapsed)
  const toggleColorPicker = useUiStore((state) => state.toggleColorPicker)

  if (collapsed) {
    return (
      <button
        className="color-picker-toggle"
        onClick={toggleColorPicker}
        aria-label="Open color picker"
        style={{ backgroundColor: color }}
      />
    )
  }

  return (
    <div className="color-picker" role="dialog" aria-label="Color picker">
      <div className="color-picker-header">
        <span>Color</span>
        <button
          className="color-picker-close"
          onClick={toggleColorPicker}
          aria-label="Close color picker"
        >
          ×
        </button>
      </div>
      <div className="color-picker-current" style={{ backgroundColor: color }} />
      <div className="color-presets">
        {PRESET_COLORS.map((presetColor) => (
          <button
            key={presetColor}
            className={`color-preset ${color === presetColor ? 'selected' : ''}`}
            onClick={() => setColor(presetColor)}
            style={{ backgroundColor: presetColor }}
            aria-label={`Select color ${presetColor}`}
            aria-pressed={color === presetColor}
          />
        ))}
      </div>
      <div className="color-custom">
        <label htmlFor="custom-color">Custom</label>
        <input
          id="custom-color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  )
}
