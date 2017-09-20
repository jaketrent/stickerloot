import glamorous from 'glamorous'
import React from 'react'

const Actions = glamorous.div({
  position: 'fixed',
  left: 0,
  bottom: 0,
  display: 'flex',
  width: '100%',
  height: '50px'
})

const Button = glamorous.button(
  {
    flex: '1',
    display: 'block',
    color: '#fff',
    fontSize: '1.125em',
    border: 'none',
    cursor: 'pointer'
  },
  ({ disabled }) => ({
    background: disabled ? '#ababab' : '#4CC13E',
    ':hover': {
      background: disabled ? '' : '#329626'
    }
  })
)

export default props =>
  <Actions>
    <Button onClick={props.onReset} disabled={!props.isCracked}>
      New Piñata
    </Button>
    <Button
      onClick={props.onTrade}
      disabled={
        !Object.keys(props.stickers || []).every(
          id => props.stickers[id].count > 0
        )
      }
    >
      Trade Stickers
    </Button>
  </Actions>
