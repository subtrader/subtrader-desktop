// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
require('dotenv').config()

//utils
const {
  getCoinPrice,
  getCoinPriceSocket,
  getCoinPricePromise,
} = require('./utils/exchange-api/binance/priceChecker')

var mainWindow = null
// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/dashboard'
    : format({
        pathname: join(__dirname, '../renderer/dashboard/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

app.on('window-all-closed', app.quit)

ipcMain.on('price', async (event, price) => {
  const h = await getCoinPricePromise()
  console.log({ h })
  event.sender.send('price-reply', h)
  // getCoinPriceSocket(res => {
  //   event.sender.send('price-reply', res)
  // })
})
