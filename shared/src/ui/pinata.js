import * as glamor from 'glamor'
import glamorous, { Div } from 'glamorous'
import React from 'react'

import * as swings from '../util/swings'
import * as random from '../util/random'
import * as stickers from '../util/stickers'

const bgColor = '#caaa65'

const Pinata = glamorous.img({
  position: 'absolute',
  bottom: '-30vw',
  left: '-30vw',
  display: 'inline-block',
  height: '50vw',
  userSelect: 'none'
})

const interjectionStyles = {
  position: 'absolute',
  top: '100px',
  left: '50%',
  maxWidth: '80vw',
  transform: 'translateX(-50%)'
}

const Whack = glamorous.img(interjectionStyles, _ => {
  const appear = glamor.css.keyframes({
    '0%': {
      transform: 'translateX(-50%) scale(0) rotate(0deg)'
    },
    '60%': {
      transform: `translateX(-50%) scale(1) rotate(${random.int(-15, 15)}deg)`
    },
    '100%': {
      transform: 'translateX(-50%) scale(0) rotate(0deg)'
    }
  })
  return {
    animation: `${appear} 700ms forwards`
  }
})

const explosion = glamor.css.keyframes({
  '0%': {
    transform: 'translateX(-50%) scale(0)',
    opacity: 1
  },
  '100%': {
    transform: `translateX(-50%) scale(5)`,
    opacity: 0
  }
})
const Explode = glamorous.img(interjectionStyles, _ => {
  return {
    animation: `${explosion} 700ms forwards`
  }
})

const Miss = glamorous.img(interjectionStyles, _ => {
  const appear = glamor.css.keyframes({
    '0%': {
      transform: 'translateX(-50%) translateY(0) scale(1)'
    },
    '100%': {
      transform: 'translateX(-50%) translateY(100%) scale(0)'
    }
  })
  return {
    animation: `${appear} 700ms forwards`
  }
})

const fall = glamor.css.keyframes({
  '0%': {
    transform: 'translateY(0)'
  },
  '100%': {
    transform: 'translateY(100vh)'
  }
})
const Thread = glamorous.div(
  {
    position: 'relative',
    left: '50vw',
    display: 'inline-block',
    width: '2px',
    height: '200px',
    background: '#ababab',
    backgroundImage: `repeating-linear-gradient(-45deg,
      red 10px,
      green 20px)`,
    borderRadius: '5px',
    transformOrigin: '50% 0'
  },
  ({ isSwinging, isHit, animationName }) =>
    isSwinging && isHit
      ? {
          animation: `${animationName} 2.5s ease-in-out`
        }
      : {},
  ({ isCracked }) =>
    isCracked
      ? {
          animation: `${fall} 1s ease-in forwards`
        }
      : {}
)

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

const Reset = glamorous.button({
  display: 'block',
  background: '#4CC13E',
  color: '#fff',
  padding: '0.5em 2em',
  borderRadius: '6px',
  margin: '64px auto 0 auto',
  fontSize: '2em',
  ':hover': {
    background: '#329626'
  }
})

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSwinging: false,
      hitsRemaining: 3,
      animationName: swings.first(),
      stickers: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  handleClick(evt) {
    evt.preventDefault()
    if (this.timer) clearTimeout(this.timer)
    const isHit = random.int(0, 4) >= 1 // 75% chance
    const hitsRemaining = this.state.hitsRemaining - (isHit ? 1 : 0)
    const isCracked = hitsRemaining <= 0

    this.setState({
      animationName: swings.asRandomKeyFrame(),
      isSwinging: true,
      isHit,
      isCracked,
      hitsRemaining,
      stickers: isCracked ? stickers.random() : []
    })
    this.props.onSwing()
    this.timer = setTimeout(_ => this.setState({ isSwinging: false }), 2600)
  }
  handleResetClick(evt) {
    evt.preventDefault()
    this.props.onStickers(this.state.stickers)
    this.setState({
      isSwinging: false,
      isCracked: false,
      hitsRemaining: 3,
      stickers: []
    })
  }
  render() {
    return (
      <Div position="relative">
        <Thread
          isCracked={this.state.isCracked}
          isSwinging={this.state.isSwinging}
          isHit={this.state.isHit}
          animationName={this.state.animationName}
        >
          <Pinata src="/static/img/pinata.png" onClick={this.handleClick} />
        </Thread>
        {this.state.isSwinging &&
          this.state.hitsRemaining > 0 &&
          this.state.isHit &&
          <Whack src="/static/img/whack.png" />}
        {this.state.isSwinging &&
          !this.state.isHit &&
          <Miss src="/static/img/miss.png" />}
        {this.state.isSwinging &&
          this.state.hitsRemaining <= 0 &&
          <Explode src="/static/img/explode.png" />}
        {this.state.isCracked && [
          <Reset key="reset" onClick={this.handleResetClick}>
            Piñata again!
          </Reset>,
          <Stickers key="stickers">
            {this.state.stickers.map((s, i) => <Sticker key={i} src={s.src} />)}
          </Stickers>
        ]}
      </Div>
    )
  }
}
