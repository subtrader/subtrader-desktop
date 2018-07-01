import { Component } from 'react'

export default class extends Component {
  state = {
    input: '',
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
        <div>This is Page2</div>
        <div>{this.state.price && <p>{this.state.price}</p>}</div>
      </div>
    )
  }
}
