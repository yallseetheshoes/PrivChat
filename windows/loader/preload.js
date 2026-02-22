

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electron', {
  connectionState: (callback) => ipcRenderer.on('server-connection', callback)
});
