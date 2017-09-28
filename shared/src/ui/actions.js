import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

import I18n from './i18n'

const ActionsDiv = glamorous.div({
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

const Actions = props => (
  <ActionsDiv>
    <Button onClick={props.onReset} disabled={!props.isCracked}>
      <I18n id="newPinata" />
    </Button>
    <Button
      onClick={props.onTrade}
      disabled={
        !Object.keys(props.stickers || []).every(
          id => props.stickers[id].count > 0
        )
      }
    >
      <I18n id="tradeStickers" />
    </Button>
  </ActionsDiv>
)
Actions.propTypes = {
  isCracked: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
  onTrade: PropTypes.func.isRequired,
  stickers: PropTypes.object.isRequired
}
export default Actions
