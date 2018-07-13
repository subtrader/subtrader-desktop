import { Component } from 'react'
import styled, { css } from 'styled-components'
import pose from 'react-pose'
import Downshift from 'downshift'

export default class extends Component {
  state = {
    selectedOption: '',
    isOpen: false,
    name: '',
  }
  render() {
    const items = [
      { label: 'BTC', value: 'BTC' },
      { label: 'ETH', value: 'ETH' },
      { label: 'BNB', value: 'BNB' },
    ]

    return (
      <Downshift
        onChange={selection => alert(`You selected ${selection.value}`)}
        itemToString={item => (item ? item.value : '')}
        onStateChange={({ inputValue, type }) => {
          if (
            type === '__autocomplete_change_input__' ||
            type === '__autocomplete_click_item__'
          ) {
            this.onChangeParticipant(inputValue || '')
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getRootProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getToggleButtonProps,
          value,
        }) => (
          <Wrapper {...getRootProps({ refKey: 'innerRef' })}>
            <SelectControls {...getToggleButtonProps()}>
              <TextInput
                {...getInputProps({ autoComplete: 'off' })}
                // placeholder="Place Holder"
                value={this.state.name}
              />
            </SelectControls>
            <SelectOtions {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(
                      item =>
                        !inputValue.toLocaleLowerCase() ||
                        item.value.toLocaleLowerCase().includes(inputValue),
                    )
                    .map((item, index) => (
                      <OtionItem
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? 'lightgray'
                                : 'white',
                            fontWeight:
                              selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {item.value}
                      </OtionItem>
                    ))
                : null}
            </SelectOtions>
          </Wrapper>
        )}
      </Downshift>
    )
  }
  onChangeParticipant = value => {
    console.log(value)
    this.setState({
      name: value,
    })
  }
}

const Wrapper = styled.div`
  width: 150px;
  height: 40px;
  line-height: 40px;
  position: relative;
`

const SelectControls = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;

  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
`

const TextInput = styled.input`
  width: 100%;
  height: 90%;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;

  font-size: 16px;
`

const SelectOtions = styled.div`
  width: 100%;
  min-height: 1px;
  position: absolute;
  top: 40px;
  left: 0;
  /* margin-top: 2px; */
  background: #fff;
`
const OtionItem = styled.div`
  width: 100%;
  min-height: 35px;
  padding: 0 10px;

  color: #333;
  ${p =>
    p.isSelected
      ? css`
          background: #000;
          color: #fff;
        `
      : css`
          background: #fff;

          &:hover {
            background: #999;
          }
        `};
`

// const PosedWrapper = pose(SelectOtions)({
//   open: {
//     y: 0,
//     opacity: 1,
//     transition: { type: 'tween', duration: 120, ease: 'easeIn' },
//   },
//   closed: {
//     y: -15,
//     opacity: 0,
//     transition: { type: 'tween', duration: 70, ease: 'easeInOut' },
//   },
// })
