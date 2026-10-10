import { contextBridge, ipcRenderer } from 'electron'
import type { AppInfo } from '../../src/shared/types/ipc'

const api = {
  getAppInfo: async (): Promise<AppInfo> => ipcRenderer.invoke('app:get-info'),
}

contextBridge.exposeInMainWorld('sketchdraw', api)
