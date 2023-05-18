const { app, BrowserWindow } = require('electron')
const path = require('path')
const ejse = require('ejs-electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 414,
    height: 736,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false
  })

  win.loadFile('client/index.ejs')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})