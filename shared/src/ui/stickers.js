import * as glamor from 'glamor'
import glamorous from 'glamorous'
import React from 'react'

const Stickers = glamorous.div({
  position: 'absolute',
  top: '0',
  left: '50%',
  width: '100%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  pointerEvents: 'none'
})

const Sticker = glamorous.img(
  {
    maxWidth: '24vw'
  },
  _ => {
    const zoom = glamor.css.keyframes({
      '0%': {
        transform: 'scale(0) translateY(0)'
      },
      '100%': {
        transform: 'scale(1) translateY(30vh)'
      }
    })
    return {
      animation: `${zoom} 700ms ease-in forwards`
    }
  }
)

export default props =>
  Array.isArray(props.stickers) && props.stickers.length > 0
    ? <Stickers>
        {props.stickers.map((s, i) => <Sticker key={i} src={s.src} />)}
      </Stickers>
    : null
