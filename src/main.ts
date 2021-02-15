import { app, BrowserWindow, Menu, Tray } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow
let tray: Tray

const preventWindowClose = function (e: Electron.Event) {
  e.preventDefault()
  mainWindow.hide()
}

const iconPath = path.join(__dirname, '../resources/kaiheila-uni.ico')
const trayMenuTemplate = [
  {
    label: '退出',
    click: function () {
      mainWindow.removeListener('close', preventWindowClose)
      mainWindow.close()
      app.quit()
      app.quit()
    },
  },
]

process.on('uncaughtException', (error: Error) => {
  console.log(error)
})

function initializeWindow() {
  // Initialize Window
  mainWindow = new BrowserWindow({
    minWidth: 1050,
    minHeight: 700,
    backgroundColor: '#6d7888',
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      // nodeIntegrationInWorker: true,
      // webSecurity: false,
    },
  })

  // Register Event Handlers
  mainWindow.on('close', preventWindowClose)

  mainWindow.loadURL('https://kaiheila.cn/app', {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4407.0 Safari/537.36 KaiheilaUni/0.1',
  })
}

function initializeTray() {
  // Initialize Tray
  tray = new Tray(iconPath)
  const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
  tray.setToolTip('开黑啦')
  tray.setContextMenu(trayMenu)
  tray.on('click', function () {
    mainWindow.show()
  })
}

app.on('ready', () => {
  // Initialize Tray
  initializeTray()

  // Initialize Window
  initializeWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) initializeWindow()
  })
})

app.on('window-all-closed', () => {
  // Ignore
})
