export interface AppInfo {
  name: string
  version: string
  platform: NodeJS.Platform
}

export interface SketchdrawApi {
  getAppInfo: () => Promise<AppInfo>
}
