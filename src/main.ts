import { app, BrowserWindow } from 'electron'
import * as path from 'path'

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      // nodeIntegrationInWorker: true,
      webSecurity: false,
    },
  })

  mainWindow.loadURL('https://kaiheila.cn/app', {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4407.0 Safari/537.36 Edg/90.0.789.1 KaiheilaUni/0.1',
  })
}

app.on('ready', () => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
