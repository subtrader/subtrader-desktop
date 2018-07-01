const Binance = require('node-binance-api')
require('dotenv').config()

//Make connaction to exchange
const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  useServerTime: true,
  test: true,
})

exports.getCoinPrice = res => {
  binance.prices('BTCUSDT', (error, ticker) => {
    console.log('Price of BTC: ', ticker.BTCUSDT)
    res(ticker.BTCUSDT)
  })
}

exports.getCoinPricePromise = () =>
  new Promise((resolve, reject) => {
    binance.prices('BTCUSDT', (error, ticker) => {
      console.log('Price of BTC: ', ticker.BTCUSDT)
      resolve(ticker.BTCUSDT)
    })
  })

exports.getCoinPriceSocket = res => {
  binance.websockets.chart('BTCUSDT', '1m', (symbol, interval, chart) => {
    let tick = binance.last(chart)
    const last = chart[tick].close
    res(last)
  })
}
