import log = require('electron-log')

export class ErrorHandler {
  constructor() {
    process.on('uncaughtException', (error: Error) => {
      log.error(error)
    })
  }
}
