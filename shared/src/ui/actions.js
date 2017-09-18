import glamorous from 'glamorous'
import React from 'react'

const Actions = glamorous.div({
  position: 'fixed',
  left: 0,
  bottom: '100px',
  display: 'flex',
  width: '100%'
})

const Button = glamorous.button(
  {
    flex: '1',
    display: 'block',
    color: '#fff',
    fontSize: '1.25em',
    padding: '1em 0.5em',
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
