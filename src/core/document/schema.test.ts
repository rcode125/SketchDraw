import { describe, expect, test } from 'vitest'
import { SKETCHDRAW_DOCUMENT_VERSION, createNewDocument } from './schema'

describe('createNewDocument', () => {
  test('creates a valid default document', () => {
    const doc = createNewDocument()

    expect(doc.schemaVersion).toBe(SKETCHDRAW_DOCUMENT_VERSION)
    expect(doc.width).toBe(1920)
    expect(doc.height).toBe(1080)
    expect(doc.layers).toHaveLength(1)
    expect(doc.layers[0]?.name).toBe('Layer 1')
    expect(doc.activeLayerId).toBe(doc.layers[0]?.id)
  })

  test('supports custom dimensions', () => {
    const doc = createNewDocument(1024, 768)
    expect(doc.width).toBe(1024)
    expect(doc.height).toBe(768)
  })
})
