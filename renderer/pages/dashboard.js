import { Component } from 'react'
import ConditionItem from '../components/ConditionItem'
import produce from 'immer'

export default class extends Component {
  state = {
    conditions: null,
  }
  componentDidMount() {
    global.ipcRenderer.on('ConditonsRestore', this.initCoditions)
    global.ipcRenderer.send('ConditonsRestore', '')
    // this.setState({
    //   conditions: [
    //     {
    //       coin: 'BTC',
    //       price: 6700,
    //       op: '>',
    //       balanceList: [
    //         { name: 'BTC', usage: true },
    //         { name: 'NEO', usage: false },
    //         { name: 'ETH', usage: true },
    //       ],
    //     },
    //     {
    //       coin: 'ETH',
    //       price: 510,
    //       op: '>',
    //       balanceList: [
    //         { name: 'ETH', usage: true },
    //         { name: 'NEO', usage: false },
    //         { name: 'BTC', usage: true },
    //       ],
    //     },
    //     {
    //       coin: 'BNB',
    //       price: 13,
    //       op: '>',
    //       balanceList: [
    //         { name: 'NEO', usage: false },
    //         { name: 'BTC', usage: true },
    //         { name: 'ETH', usage: false },
    //       ],
    //     },
    //   ],
    // })
  }

  componentWillUnmount() {
    global.ipcRenderer.removeListener('ConditonsRestore', this.handlePrice)
  }

  initCoditions = (event, conditions) => {
    console.log(conditions)
    this.setState({ conditions })
  }

  restoreConditions = () => {
    global.ipcRenderer.send('ConditonsRestore', '')
  }

  onClickBalanceCoin = (itemIndex, balanceIndex) => {
    console.log(itemIndex, balanceIndex)
    const nextState = produce(this.state, draft => {
      const is = draft.conditions[itemIndex].balanceList[balanceIndex]

      amdlk.usage = !amdlk.usage
    })
    this.setState(nextState)
    global.ipcRenderer.send('ConditonsSave', nextState.conditions)
  }

  render() {
    return (
      <div>
        <div onClick={() => this.restoreConditions()}>My Conditions</div>
        {this.state.conditions &&
          this.state.conditions.map((p, i) => (
            <ConditionItem
              balanceList={p.balanceList}
              key={i}
              index={i}
              onClickBalanceCoin={this.onClickBalanceCoin}
            >
              {p.coin}
              <span>({p.price})</span>
            </ConditionItem>
          ))}
      </div>
    )
  }
}
