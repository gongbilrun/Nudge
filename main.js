const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')

const store = new Store()
let win

function createWindow() {
  const saved = store.get('bounds', { x: 40, y: 40, width: 300, height: 440 })

  win = new BrowserWindow({
    x: saved.x, y: saved.y,
    width: saved.width, height: saved.height,
    minWidth: 220, minHeight: 120,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadFile('widget.html')
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  win.on('moved', save)
  win.on('resized', save)
}

function save() {
  if (win) store.set('bounds', win.getBounds())
}

ipcMain.handle('get-events',   ()      => store.get('events', []))
ipcMain.handle('save-events',  (_, v)  => { store.set('events', v); return true })
ipcMain.handle('get-settings', ()      => store.get('settings', { opacity: 90, fontSize: 12 }))
ipcMain.handle('save-settings',(_, v)  => { store.set('settings', v); return true })
ipcMain.on('minimize', () => win.minimize())
ipcMain.on('close',    () => win.hide())

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
