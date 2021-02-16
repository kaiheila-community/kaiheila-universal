import log = require('electron-log')
import { autoUpdater } from 'electron-updater'
import { IInitializable } from './types'

export class Updater implements IInitializable {
  constructor() {
    // Config Auto Updater
    autoUpdater.logger = log
  }

  public initialize(): void {
    autoUpdater.checkForUpdatesAndNotify()
  }
}
