import { app, BrowserWindow, Menu, Tray } from 'electron'
import { pathResolve } from '../utils'
import { IInitializable } from './types'

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4407.0 Safari/537.36 KaiheilaUni/0.1'

export class UniShell implements IInitializable {
  // Shell Components
  private mainWindow: BrowserWindow
  private tray: Tray

  private iconPath = pathResolve('../resources/kaiheila-uni.ico')

  // Initialize Methods
  private initializeWindow(): void {
    // Initialize Window
    this.mainWindow = new BrowserWindow({
      minWidth: 1050,
      minHeight: 700,
      backgroundColor: '#6d7888',
      icon: this.iconPath,
      webPreferences: {
        preload: pathResolve('preload/index.js'),
        // nodeIntegration: true,
        // nodeIntegrationInWorker: true,
        // webSecurity: false,
      },
    })

    // Register Event Handlers
    this.mainWindow.on('close', this.preventWindowClose)

    this.mainWindow.loadURL('https://kaiheila.cn/app', {
      userAgent,
    })
  }

  private initializeTray(): void {
    // Initialize Tray
    this.tray = new Tray(this.iconPath)
    this.tray.setToolTip('开黑啦')
    this.tray.setContextMenu(Menu.buildFromTemplate(this.trayMenuTemplate))
    this.tray.on('click', (): void => {
      this.mainWindow.show()
    })
  }

  initialize(): void {
    // Initialize App Menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.appMenuTemplate))

    // Initialize Tray
    this.initializeTray()

    // Initialize Window
    this.initializeWindow()
    app.on('activate', (): void => {
      if (BrowserWindow.getAllWindows().length === 0) this.initializeWindow()
    })
  }

  // Utils
  private preventWindowClose = this.preventWindowCloseIntl.bind(this)
  private quitApp = this.quitAppIntl.bind(this)

  private preventWindowCloseIntl(e: Electron.Event): void {
    e.preventDefault()
    this.mainWindow.hide()
  }

  private quitAppIntl(): void {
    this.mainWindow.removeListener('close', this.preventWindowClose)
    this.mainWindow.close()
    app.quit()
    app.quit()
  }

  // Menu Templates
  private appMenuTemplate: Electron.MenuItemConstructorOptions[] = [
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
          click: this.quitApp,
        },
      ],
    },
  ]
  private trayMenuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: '退出',
      click: this.quitApp,
    },
  ]
}
