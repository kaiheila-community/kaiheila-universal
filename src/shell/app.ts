import { app } from 'electron'
import { ErrorHandler } from './errHandle'
import { UniShell } from './uniShell'
import { Updater } from './updater'

export class App {
  // Construct Components
  private updater: Updater = new Updater()
  private uniShell: UniShell = new UniShell()
  private errorHandler: ErrorHandler = new ErrorHandler()

  constructor() {
    app.on('ready', (): void => {
      this.updater.initialize()
      this.uniShell.initialize()
    })

    app.on('window-all-closed', () => {
      // Ignore
    })
  }
}
