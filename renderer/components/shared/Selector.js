import { Component, Fragment } from 'react'
import Select, { components } from 'react-select'
import styled from 'styled-components'

export default class extends Component {
  render() {
    const optionsValues = [
      { value: 'BTC', label: 'BTC' },
      { value: 'ETH', label: 'ETH' },
      { value: 'BNB', label: 'BNB' },
    ]
    const optionsValues2 = [
      { value: 'BTC', label: '>=' },
      { value: 'ETH', label: '<=' },
      { value: 'BNB', label: '=' },
    ]

    return (
      <Wrapper>
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Coin"
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="coin"
          options={optionsValues}
          components={{ Control: ControlComponent }}
        />
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="op"
          name="op"
          options={optionsValues2}
          components={{ Control: ControlComponent2 }}
        />
      </Wrapper>
    )
  }
}

//select compontest
const controlStyles = {
  color: 'white',
  width: '200px',
  position: 'absloute',
}
const controlStyles2 = {
  color: 'white',
  width: '100px',
  position: 'absloute',
}

const ControlComponent = props => (
  <div style={controlStyles}>
    <components.Control {...props} />
  </div>
)

const ControlComponent2 = props => (
  <div style={controlStyles2}>
    <components.Control {...props} />
  </div>
)

const Wrapper = styled.div`
  display: flex;
`
