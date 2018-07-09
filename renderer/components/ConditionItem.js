import { Component } from 'react'
import styled from 'styled-components'

class ConditionItem extends Component {
  render() {
    const { children, balanceList, onClickBalanceCoin, index } = this.props

    return (
      <Wrapper>
        <div>{children}</div>
        <BalanceCointainer>
          {balanceList.map((p, i) => (
            <BalanceCoin
              usage={p.usage}
              key={i}
              onClick={() => onClickBalanceCoin(index, i)}
            >
              <span>{p.name}</span>
            </BalanceCoin>
          ))}
        </BalanceCointainer>
      </Wrapper>
    )
  }
}
export default ConditionItem

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #999;
  margin-top: 20px;
  padding: 10px;
`

const BalanceCointainer = styled.div`
  margin-top: 10px;
  display: flex;
`

const BalanceCoin = styled.div`
  width: 100px;
  padding: 5px;
  margin-right: 5px;
  /* border-radius: 3px; */
  cursor: pointer;
  background: ${p => (p.usage ? '#3F51B5' : '#f44336')};
  color: ${p => (p.usage ? '#fff' : '#fff')};
`
