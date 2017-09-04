import * as glamor from 'glamor'
import glamorous, { Div } from 'glamorous'
import React from 'react'

import * as swings from '../util/swings'
import * as random from '../util/random'

const bgColor = '#caaa65'

const Pinata = glamorous.img({
  position: 'absolute',
  bottom: '-30vw',
  left: '-30vw',
  display: 'inline-block',
  height: '50vw',
  userSelect: 'none'
})

const Interjection = glamorous.img(
  {
    position: 'relative',
    top: '100px',
    left: '50%',
    maxWidth: '80vw',
    transform: 'translateX(-50%)'
  },
  _ => {
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
  }
)

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
      : {}
)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSwinging: false,
      animationName: swings.first()
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(evt) {
    evt.preventDefault()
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      animationName: swings.asRandomKeyFrame(),
      isSwinging: true,
      isHit: random.int(0, 4) >= 1 // 75% chance
    })
    this.props.onSwing()
    this.timer = setTimeout(_ => this.setState({ isSwinging: false }), 2600)
  }
  render() {
    return (
      <Div position="relative">
        <Thread
          isSwinging={this.state.isSwinging}
          isHit={this.state.isHit}
          animationName={this.state.animationName}
        >
          <Pinata src="/static/img/pinata.png" onClick={this.handleClick} />
        </Thread>
        {this.state.isSwinging &&
          this.state.isHit &&
          <Interjection src="/static/img/whack.png" />}
        {this.state.isSwinging &&
          !this.state.isHit &&
          <Interjection src="/static/img/miss.png" />}
      </Div>
    )
  }
}
