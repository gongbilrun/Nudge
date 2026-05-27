const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nudge', {
  getEvents:    ()    => ipcRenderer.invoke('get-events'),
  saveEvents:   (v)   => ipcRenderer.invoke('save-events', v),
  getSettings:  ()    => ipcRenderer.invoke('get-settings'),
  saveSettings: (v)   => ipcRenderer.invoke('save-settings', v),
  minimize:     ()    => ipcRenderer.send('minimize'),
  close:        ()    => ipcRenderer.send('close'),
  showReminder: ()    => ipcRenderer.send('show-reminder'),
})
