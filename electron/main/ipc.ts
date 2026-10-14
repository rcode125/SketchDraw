import { ipcMain } from 'electron'

// No payload expected for app:get-info; simply return static information

export const registerIpcHandlers = (): void => {
  ipcMain.handle('app:get-info', () => {
    // No validation needed – payload is ignored


    return {
      name: 'SketchDraw',
      version: process.env.npm_package_version ?? '0.0.0',
      platform: process.platform,
    }
  })
}
