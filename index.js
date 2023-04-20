const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: 0,
    resizable: false,
    transparent: true,
    webPreferences: {
        nodeInegration: true,
        nodeIntegrationInWorker: true,
        sandbox: false,
        contextIsolation: true,
        webviewTag: true,
        preload: path.join(__dirname, 'preload.js'),
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){createWindow()}
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){app.quit()}
})
