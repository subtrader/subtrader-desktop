import { Component } from 'react'
import produce from 'immer'

import ConditionItem from '../components/ConditionItem'
import Selector from '../components/shared/Selector'
import SelectorMin from '../components/shared/SelectorMin'

export default class extends Component {
  state = {
    conditions: null,
  }

  render() {
    return (
      <div>
        <div onClick={() => this.restoreConditions()}>My Conditions</div>
        <button onClick={() => this.clearConditions()}>rest</button>
        <button onClick={() => this.testDataConditions()}>test data</button>
        <hr />
        <SelectorMin />
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

  componentDidMount() {
    global.ipcRenderer.on('ConditonsRestore', this.initCoditions)
    global.ipcRenderer.send('ConditonsRestore', '')
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

  clearConditions = () => {
    if (confirm('Are you sure?')) {
      global.ipcRenderer.send('ConditonsSave', [])
      global.ipcRenderer.send('ConditonsRestore', '')
    }
  }

  testDataConditions = () => {
    if (confirm('Are you sure?')) {
      this.setState({
        conditions: [
          {
            coin: 'BTC',
            price: 6700,
            op: '>',
            balanceList: [
              { name: 'BTC', usage: true },
              { name: 'NEO', usage: false },
              { name: 'ETH', usage: true },
            ],
          },
          {
            coin: 'ETH',
            price: 510,
            op: '>',
            balanceList: [
              { name: 'ETH', usage: true },
              { name: 'NEO', usage: false },
              { name: 'BTC', usage: true },
            ],
          },
          {
            coin: 'BNB',
            price: 13,
            op: '>',
            balanceList: [
              { name: 'NEO', usage: false },
              { name: 'BTC', usage: true },
              { name: 'ETH', usage: false },
            ],
          },
        ],
      })
      global.ipcRenderer.send('ConditonsSave', this.state.conditions)
    }
  }

  onClickBalanceCoin = (itemIndex, balanceIndex) => {
    console.log(itemIndex, balanceIndex)
    const nextState = produce(this.state, draft => {
      const isInfected = draft.conditions[itemIndex].balanceList[balanceIndex]

      isInfected.usage = !isInfected.usage
    })
    this.setState(nextState)
    global.ipcRenderer.send('ConditonsSave', nextState.conditions)
  }
}
