import { Component } from 'react'
// import Balance from '../components/binance/Balance'

export default class extends Component {
  state = {
    price: null,
  }
  componentDidMount() {
    global.ipcRenderer.on('price-reply', this.handlePrice)
    global.ipcRenderer.send('price', 1)
  }
  componentWillUnmount() {
    // stop listening the channel message
    global.ipcRenderer.removeListener('price', this.handlePrice)
  }
  handlePrice = (event, price) => {
    console.log('price', price)
    this.setState({ price })

    // let mainValue = global.ipcRenderer.sendSync('price', 3)
    // console.log(mainValue)
  }
  render() {
    return (
      <div>
        This is Balance Page
        <div>
          {/* <Balance /> */}
          <div>{this.state.price && <p>{this.state.price}</p>}</div>
        </div>
      </div>
    )
  }
}
