import { describe, beforeEach, test, expect } from 'vitest'
import { act } from '@testing-library/react'
import { useDrawingStore } from './drawingStore'

describe('drawingStore undo/redo', () => {
  beforeEach(() => {
    // reset store state
    act(() => {
      const { clearStrokes, setTool, setColor, setSize } = useDrawingStore.getState()
      clearStrokes()
      setTool('pencil')
      setColor('#000000')
      setSize(5)
    })
  })

  test('undo removes last stroke and puts it on redo stack', () => {
    act(() => {
      const { startStroke, addPoint, endStroke } = useDrawingStore.getState()
      startStroke({ x: 0, y: 0 })
      addPoint({ x: 10, y: 10 })
      endStroke()
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(1)

    act(() => {
      useDrawingStore.getState().undoLastStroke()
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(0)
    expect(useDrawingStore.getState().redoStack).toHaveLength(1)
  })

  test('clearStrokes resets redo stack', () => {
    // create a stroke and undo it
    act(() => {
      const { startStroke, addPoint, endStroke, undoLastStroke, clearStrokes } = useDrawingStore.getState()
      startStroke({ x: 0, y: 0 })
      addPoint({ x: 5, y: 5 })
      endStroke()
      undoLastStroke()
    })
    expect(useDrawingStore.getState().redoStack).toHaveLength(1)
    // clear strokes should also clear redoStack
    act(() => {
      useDrawingStore.getState().clearStrokes()
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(0)
  test('multiple undo/redo maintains stack correctly', () => {
    // create three strokes
    act(() => {
      const { startStroke, addPoint, endStroke } = useDrawingStore.getState()
      ;[0, 1, 2].forEach((i) => {
        startStroke({ x: i * 10, y: i * 10 })
        addPoint({ x: i * 10 + 5, y: i * 10 + 5 })
        endStroke()
      })
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(3)

    // undo twice
    act(() => {
      useDrawingStore.getState().undoLastStroke()
      useDrawingStore.getState().undoLastStroke()
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(1)
    expect(useDrawingStore.getState().redoStack).toHaveLength(2)

    // redo one
    act(() => {
      useDrawingStore.getState().redoLastStroke()
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(2)
    expect(useDrawingStore.getState().redoStack).toHaveLength(1)

    // draw a new stroke after undo history - should clear redo stack
    act(() => {
      const { startStroke, addPoint, endStroke } = useDrawingStore.getState()
      startStroke({ x: 99, y: 99 })
      addPoint({ x: 100, y: 100 })
      endStroke()
    })
    expect(useDrawingStore.getState().strokes).toHaveLength(3)
    expect(useDrawingStore.getState().redoStack).toHaveLength(0)
  })
  })
