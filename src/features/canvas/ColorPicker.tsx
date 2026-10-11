import { useDrawingStore } from '../../app/state/drawingStore'
import { useUiStore } from '../../app/state/uiStore'
import { useState, useRef, useEffect } from 'react'
import './ColorPicker.css'

const PRESET_COLORS = [
  '#000000',
  '#ffffff',
  '#ff3b30',
  '#ff9500',
  '#ffcc00',
  '#34c759',
  '#007aff',
  '#5856d6',
  '#af52de',
  '#ff2d55',
  '#bf5af2',
  '#ff9f0a',
  '#8e8e93',
  '#636366',
  '#3c3c43',
  '#1c1c1e',
]

const PRESET_PALETTES = {
  default: PRESET_COLORS,
  grayscale: [
    '#000000',
    '#1c1c1e',
    '#3c3c43',
    '#636366',
    '#8e8e93',
    '#c7c7cc',
    '#d1d1d6',
    '#e8e8ed',
    '#f2f2f7',
    '#ffffff',
  ],
  reds: [
    '#7f1d1d',
    '#991b1b',
    '#b91c1c',
    '#dc2626',
    '#ef4444',
    '#f87171',
    '#fca5a5',
    '#fecaca',
    '#fee2e2',
    '#fff1f2',
  ],
  oranges: [
    '#7c2d12',
    '#9a3412',
    '#c2410c',
    '#ea580c',
    '#f97316',
    '#fb923c',
    '#fdba74',
    '#ffedd5',
    '#fff7ed',
    '#fffbeb',
  ],
  yellows: [
    '#713f12',
    '#854d0e',
    '#a16207',
    '#ca8a04',
    '#eab308',
    '#facc15',
    '#fde047',
    '#fef08a',
    '#fef9c3',
    '#fefce8',
  ],
  greens: [
    '#14532d',
    '#166534',
    '#15803d',
    '#16a34a',
    '#22c55e',
    '#4ade80',
    '#86efac',
    '#bbf7d0',
    '#dcfce7',
    '#f0fdf4',
  ],
  blues: [
    '#1e3a5f',
    '#1e40af',
    '#2563eb',
    '#3b82f6',
    '#60a5fa',
    '#93c5fd',
    '#bfdbfe',
    '#dbeafe',
    '#eff6ff',
    '#f8fafc',
  ],
  purples: [
    '#4c1d95',
    '#5b21b6',
    '#6d28d9',
    '#8b5cf6',
    '#a78bfa',
    '#c4b5fd',
    '#ddd6fe',
    '#ede9fe',
    '#f5f3ff',
    '#faf5ff',
  ],
  pinks: [
    '#831843',
    '#9d174d',
    '#be185d',
    '#db2777',
    '#ec4899',
    '#f472b6',
    '#f9a8d4',
    '#fbcfe8',
    '#fce7f3',
    '#fdf2f8',
  ],
}

export const ColorPicker = () => {
  const color = useDrawingStore((state) => state.color)
  const setColor = useDrawingStore((state) => state.setColor)
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed)
  const activeSidebarTab = useUiStore((state) => state.activeSidebarTab)

  const [activePalette, setActivePalette] = useState<keyof typeof PRESET_PALETTES>('default')
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)
  const [showColorWheel, setShowColorWheel] = useState(false)
  const colorWheelRef = useRef<HTMLDivElement>(null)
  const saturationRef = useRef<HTMLDivElement>(null)

  const currentPalette = PRESET_PALETTES[activePalette]

  useEffect(() => {
    const c = color.replace('#', '')
    const r = parseInt(c.slice(0, 2), 16) / 255
    const g = parseInt(c.slice(2, 4), 16) / 255
    const b = parseInt(c.slice(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    setHue(Math.round(h * 360))
    setSaturation(Math.round(s * 100))
    setLightness(Math.round(l * 100))
  }, [color])

  const handleWheelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = colorWheelRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const angle = Math.atan2(y, x)
    const newHue = ((angle * 180) / Math.PI + 360) % 360
    setHue(newHue)
    updateColorFromHSL()
  }

  const handleSaturationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = saturationRef.current!.getBoundingClientRect()
    const newSaturation = ((e.clientX - rect.left) / rect.width) * 100
    const newLightness = 100 - ((e.clientY - rect.top) / rect.height) * 100
    setSaturation(Math.max(0, Math.min(100, newSaturation)))
    setLightness(Math.max(0, Math.min(100, newLightness)))
    updateColorFromHSL()
  }

  const updateColorFromHSL = () => {
    const h = hue / 360
    const s = saturation / 100
    const l = lightness / 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    const newColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`
    setColor(newColor)
  }

  const handleHueChange = (value: number) => {
    setHue(value)
    updateColorFromHSL()
  }

  const handleSaturationChange = (value: number) => {
    setSaturation(value)
    updateColorFromHSL()
  }

  const handleLightnessChange = (value: number) => {
    setLightness(value)
    updateColorFromHSL()
  }

  const handlePaletteColorClick = (presetColor: string) => {
    setColor(presetColor)
    setShowColorWheel(false)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    setShowColorWheel(false)
  }

  if (sidebarCollapsed || activeSidebarTab !== 'tools') {
    return null
  }

  return (
    <div className="color-picker" role="dialog" aria-label="Color picker">
      <div className="color-picker-header">
        <div className="color-picker-tabs" role="tablist" aria-label="Color modes">
          <button
            role="tab"
            aria-selected={!showColorWheel}
            onClick={() => setShowColorWheel(false)}
            className={`color-picker-tab ${!showColorWheel ? 'active' : ''}`}
          >
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
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
            <span>Swatches</span>
          </button>
          <button
            role="tab"
            aria-selected={showColorWheel}
            onClick={() => setShowColorWheel(true)}
            className={`color-picker-tab ${showColorWheel ? 'active' : ''}`}
          >
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span>Wheel</span>
          </button>
        </div>

        <select
          className="color-picker-palette-select"
          value={activePalette}
          onChange={(e) => setActivePalette(e.target.value as keyof typeof PRESET_PALETTES)}
          aria-label="Color palette"
        >
          {Object.keys(PRESET_PALETTES).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {!showColorWheel ? (
        <div className="color-picker-swatches">
          <div
            className="color-picker-current-swatch"
            style={{ backgroundColor: color }}
            aria-label={`Current color: ${color}`}
          />
          <div className="color-presets" role="listbox" aria-label="Color presets">
            {currentPalette.map((presetColor) => (
              <button
                key={presetColor}
                className={`color-preset ${color === presetColor ? 'selected' : ''}`}
                onClick={() => handlePaletteColorClick(presetColor)}
                style={{ backgroundColor: presetColor }}
                role="option"
                aria-label={`Select color ${presetColor}`}
                aria-selected={color === presetColor}
              />
            ))}
          </div>
          <div className="color-custom">
            <label htmlFor="custom-color" className="label">
              Custom Color
            </label>
            <input
              id="custom-color"
              type="color"
              value={color}
              onChange={handleCustomColorChange}
              className="color-custom-input"
              aria-label="Custom color picker"
            />
            <input
              type="text"
              value={color.toUpperCase()}
              onChange={(e) => {
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                  setColor(e.target.value)
                }
              }}
              className="color-hex-input"
              placeholder="#RRGGBB"
              aria-label="Hex color value"
              spellCheck={false}
            />
          </div>
        </div>
      ) : (
        <div className="color-picker-wheel">
          <div className="color-wheel-container">
            <div
              ref={colorWheelRef}
              className="color-wheel"
              onClick={handleWheelClick}
              onMouseDown={(e) => {
                e.preventDefault()
                handleWheelClick(e)
              }}
              role="slider"
              aria-label="Hue"
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={Math.round(hue)}
              tabIndex={0}
              onKeyDown={(e) => {
                const step = e.shiftKey ? 15 : 1
                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                  e.preventDefault()
                  handleHueChange((hue + step) % 360)
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                  e.preventDefault()
                  handleHueChange((hue - step + 360) % 360)
                }
              }}
            >
              <div className="color-wheel-hue-marker" style={{ transform: `rotate(${hue}deg)` }} />
            </div>

            <div
              ref={saturationRef}
              className="color-saturation"
              style={{ background: `hsl(${hue}, 100%, 50%)` }}
              onClick={handleSaturationClick}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSaturationClick(e)
              }}
              role="slider"
              aria-label="Saturation and Lightness"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(saturation)}
              tabIndex={0}
              onKeyDown={(e) => {
                const step = e.shiftKey ? 10 : 1
                if (e.key === 'ArrowRight') {
                  e.preventDefault()
                  handleSaturationChange(Math.min(100, saturation + step))
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault()
                  handleSaturationChange(Math.max(0, saturation - step))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  handleLightnessChange(Math.min(100, lightness + step))
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  handleLightnessChange(Math.max(0, lightness - step))
                }
              }}
            >
              <div
                className="color-saturation-marker"
                style={{
                  left: `${saturation}%`,
                  top: `${100 - lightness}%`,
                }}
              />
            </div>
          </div>

          <div className="color-wheel-controls">
            <div className="color-wheel-control">
              <label className="label">Hue</label>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => handleHueChange(Number(e.target.value))}
                className="slider"
                aria-label="Hue"
              />
              <span className="color-wheel-value">{Math.round(hue)}°</span>
            </div>
            <div className="color-wheel-control">
              <label className="label">Saturation</label>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={(e) => handleSaturationChange(Number(e.target.value))}
                className="slider"
                aria-label="Saturation"
              />
              <span className="color-wheel-value">{Math.round(saturation)}%</span>
            </div>
            <div className="color-wheel-control">
              <label className="label">Lightness</label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={(e) => handleLightnessChange(Number(e.target.value))}
                className="slider"
                aria-label="Lightness"
              />
              <span className="color-wheel-value">{Math.round(lightness)}%</span>
            </div>
          </div>

          <div className="color-wheel-current">
            <div className="color-wheel-current-swatch" style={{ backgroundColor: color }} />
            <div className="color-wheel-current-info">
              <div className="color-wheel-hex">{color.toUpperCase()}</div>
              <div className="color-wheel-hsl">
                HSL({Math.round(hue)}, {Math.round(saturation)}%, {Math.round(lightness)}%)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
