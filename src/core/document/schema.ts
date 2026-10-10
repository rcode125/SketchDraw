export const SKETCHDRAW_DOCUMENT_VERSION = 1

export interface LayerModel {
  id: string
  name: string
  visible: boolean
  opacity: number
  locked: boolean
}

export interface SketchDocument {
  schemaVersion: number
  width: number
  height: number
  backgroundColor: string
  layers: LayerModel[]
  activeLayerId: string
}

const createLayerId = () =>
  `layer_${typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Date.now()}`

export const createNewDocument = (width = 1920, height = 1080): SketchDocument => {
  const baseLayerId = createLayerId()
  return {
    schemaVersion: SKETCHDRAW_DOCUMENT_VERSION,
    width,
    height,
    backgroundColor: '#ffffff',
    layers: [
      {
        id: baseLayerId,
        name: 'Layer 1',
        visible: true,
        opacity: 1,
        locked: false,
      },
    ],
    activeLayerId: baseLayerId,
  }
}
