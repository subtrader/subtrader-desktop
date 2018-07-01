import { Component } from 'react'
import Balance from '../components/binance/Balance'

export default class extends Component {
  state = {
    input: '',
    message: null,
  }

  render() {
    return (
      <div>
        This is Balance Page
        <div>
          <Balance />
        </div>
      </div>
    )
  }
}
