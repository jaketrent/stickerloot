import glamorous from 'glamorous'
import React from 'react'

const bgColor = '#1b91ce'

const Stats = glamorous.div({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  background: bgColor
})

const Swings = glamorous.div({
  transform: 'scale(1.5) translate(15%, -15%)',
  borderTop: `4px solid ${bgColor}`,
  borderRight: `12px solid ${bgColor}`,
  textAlign: 'center',
  borderRadius: '0 8px 0 0'
})

const SwingsLabel = glamorous.div({
  background: bgColor,
  color: '#fff',
  fontSize: '8px',
  padding: '0 4px 4px 4px'
})

const SwingsCount = glamorous.div({
  padding: '4px 12px 4px 12px',
  fontSize: '3em',
  fontWeight: '800',
  background: '#fff',
  color: bgColor
})

const Sticker = props =>
  <div>
    {props.src} => {props.count}
  </div>

export default props =>
  <Stats>
    <Swings>
      <SwingsLabel>Swings Left</SwingsLabel>
      <SwingsCount>{props.swings}</SwingsCount>
    </Swings>
    {Object.keys(props.stickers).map(key =>
      <Sticker
        key={props.stickers[key].src}
        src={props.stickers[key].src}
        count={props.stickers[key].count}
      />
    )}
  </Stats>
