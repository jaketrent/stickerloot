import * as glamor from 'glamor'
import glamorous from 'glamorous'
import React from 'react'

const bounce = glamor.css.keyframes({
  '100%': {
    transform: 'rotate(180deg) translate(50%, -50vh)'
  }
})

const End = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10vw 10px',
  height: '75vh' // magic #
})
const GameOver = glamorous.div({
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

export default props =>
  <End>
    <GameOver>Fiesta's Over!</GameOver>
    <SwingsLabel>Total Swings</SwingsLabel>
    <SwingsCount>{props.swingsCount}</SwingsCount>
    <Pinata src="/static/img/pinata.png" />
  </End>
