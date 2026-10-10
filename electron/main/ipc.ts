import { ipcMain } from 'electron'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const registerIpcHandlers = (): void => {
  ipcMain.handle('app:get-info', (_event, payload: unknown) => {
    if (payload !== undefined && !isRecord(payload)) {
      throw new Error('Invalid payload for app:get-info')
    }

    return {
      name: 'SketchDraw',
      version: process.env.npm_package_version ?? '0.0.0',
      platform: process.platform,
    }
  })
}
