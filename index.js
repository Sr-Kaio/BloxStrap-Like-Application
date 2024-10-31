const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 460,
    resizable: false,
    titleBarStyle: 'hidden',
    frame: false,
    icon: "res/favicon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'src/js/preload.js')
    }
  })

  mainWindow.loadFile('src/index.html')
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})