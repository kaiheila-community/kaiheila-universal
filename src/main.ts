import { app, BrowserWindow, Menu, Tray } from 'electron'
import { autoUpdater } from 'electron-updater'
import * as path from 'path'
import log = require('electron-log')

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4407.0 Safari/537.36 KaiheilaUni/0.1'

let mainWindow: BrowserWindow
let tray: Tray

// Config Auto Updater
autoUpdater.logger = log

// Utils
const preventWindowClose = function (e: Electron.Event) {
  e.preventDefault()
  mainWindow.hide()
}

const quitApp = function () {
  mainWindow.removeListener('close', preventWindowClose)
  mainWindow.close()
  app.quit()
  app.quit()
}

// Config App Menu
const appMenuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: '开黑啦',
    submenu: [
      {
        label: '关于开黑啦 Universal',
        role: 'about',
      },
      {
        label: '退出',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : undefined,
        click: quitApp,
      },
    ],
  },
]

const iconPath = path.join(__dirname, '../resources/kaiheila-uni.ico')
const trayMenuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: '退出',
    click: quitApp,
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
    userAgent,
  })
}

function initializeTray() {
  // Initialize Tray
  tray = new Tray(iconPath)
  tray.setToolTip('开黑啦')
  tray.setContextMenu(Menu.buildFromTemplate(trayMenuTemplate))
  tray.on('click', function () {
    mainWindow.show()
  })
}

app.on('ready', () => {
  // Initialize App Menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(appMenuTemplate))

  // Initialize Tray
  initializeTray()

  // Initialize Window
  initializeWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) initializeWindow()
  })

  // Auto Update
  autoUpdater.checkForUpdatesAndNotify()
})

app.on('window-all-closed', () => {
  // Ignore
})
