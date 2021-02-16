import { app, BrowserWindow, Menu, Tray } from 'electron'
import { pathResolve } from '../utils'
import { IInitializable } from './types'

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4407.0 Safari/537.36 KaiheilaUni/0.1'
const isMac = process.platform === 'darwin'

export class UniShell implements IInitializable {
  // Shell Components
  private mainWindow: BrowserWindow
  private tray: Tray

  private iconPath =
    process.platform === 'darwin'
      ? pathResolve('../resources/kaiheila-uniTemplate.png')
      : process.platform === 'win32'
      ? pathResolve('../resources/kaiheila-uni.ico')
      : pathResolve('../resources/kaiheila-uni.png')

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
    if (e.preventDefault) e.preventDefault()
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
        { type: 'separator' },
        { label: '服务', role: 'services', enabled: isMac },
        { type: 'separator' },
        {
          label: '隐藏',
          accelerator: isMac ? 'Command+H' : 'Ctrl+H',
          click: this.preventWindowClose,
        },
        { label: '解除隐藏', role: 'unhide', enabled: isMac },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
          click: this.quitApp,
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '重做', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '拷贝', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '删除', role: 'delete' },
        { type: 'separator' },
        { label: '选择全部', role: 'selectAll' },
        { type: 'separator' },
        { label: '开始听写', role: 'startSpeaking', enabled: isMac },
        { label: '停止听写', role: 'stopSpeaking', enabled: isMac },
      ],
    },
    {
      label: '浏览',
      submenu: [
        { label: '重载', role: 'reload' },
        { label: '强制重载', role: 'forceReload' },
        { type: 'separator' },
        { label: '实际大小', role: 'resetZoom' },
        { label: '放大', role: 'zoomIn' },
        { label: '缩小', role: 'zoomOut' },
        { type: 'separator' },
        { label: '切换全屏幕', role: 'togglefullscreen' },
      ],
    },
    {
      label: '预览',
      submenu: [{ label: '切换开发者工具', role: 'toggleDevTools' }],
    },
  ]
  private trayMenuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: '退出',
      click: this.quitApp,
    },
  ]
}
