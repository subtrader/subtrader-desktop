const { ipcRenderer, remote } = require('electron')

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer
  global.process = { env: process.env }
})
