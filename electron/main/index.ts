import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { registerIpcHandlers } from './ipc'

app.disableHardwareAcceleration()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = !app.isPackaged
const rendererUrl = process.env.VITE_DEV_SERVER_URL

const preloadPath = isDev
  ? path.join(__dirname, 'preload.js')
  : path.join(__dirname, '../preload/index.js')

const createMainWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    show: false,
    backgroundColor: '#1A1B1F',
    title: 'SketchDraw',
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  if (isDev && rendererUrl) {
    await mainWindow.loadURL(rendererUrl)
  } else {
    await mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'))
  }
}

void app.whenReady().then(async () => {
  registerIpcHandlers()
  await createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
