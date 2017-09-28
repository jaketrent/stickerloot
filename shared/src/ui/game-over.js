import * as glamor from 'glamor'
import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

import I18n from './i18n'

const bounce = glamor.css.keyframes({
  '100%': {
    transform: 'rotate(180deg) translate(50%, -43vh)'
  }
})

const End = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10vw 10px'
})
const GameOverDiv = glamorous.div({
  fontSize: '3em',
  textTransform: 'uppercase',
  color: 'red',
  fontWeight: '800',
  textAlign: 'center'
})
const SwingsLabel = glamorous.div({
  marginTop: '24px'
})
const SwingsCount = glamorous.div({
  marginTop: '24px',
  fontSize: '3em',
  fontWeight: '800'
})
const Pinata = glamorous.img({
  position: 'absolute',
  top: '0',
  left: '50%',
  maxWidth: '80vw',
  transform: 'rotate(180deg) translate(50%, 100%)',

  animation: `${bounce} 400ms ease-in 1000ms forwards`
})

const GameOver = props => (
  <End>
    <GameOverDiv>
      <I18n id="gameOver" />
    </GameOverDiv>
    <SwingsLabel>
      <I18n id="totalSwings" />
    </SwingsLabel>
    <SwingsCount>{props.swingsCount}</SwingsCount>
    <Pinata src="/static/img/pinata.png" />
  </End>
)
GameOver.propTypes = {
  swingsCount: PropTypes.number.isRequired
}

export default GameOver
