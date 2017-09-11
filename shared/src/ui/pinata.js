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
    height: '30vh',
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

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSwinging: false,
      animationName: swings.first()
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
  }
  componentDidMount() {
    this.threadEl.addEventListener('animationend', this.handleAnimationEnd)
    this.threadEl.addEventListener('animationcancel', this.handleAnimationEnd)
  }
  componentWillUnmount() {
    this.threadEl.removeEventListener('animationend', this.handleAnimationEnd)
    this.threadEl.removeEventListener(
      'animationcancel',
      this.handleAnimationEnd
    )
  }
  handleAnimationEnd(evt) {
    this.setState({ isSwinging: false, isHit: false })
  }
  handleClick(evt) {
    evt.preventDefault()
    const isHit = random.int(0, 4) >= 1 // 75% chance

    this.setState({
      animationName: swings.asRandomKeyFrame(),
      isSwinging: true,
      isHit
    })

    this.props.onSwing(isHit)
  }
  render() {
    return (
      <Div position="relative">
        <Thread
          isCracked={this.props.isCracked}
          isSwinging={this.state.isSwinging}
          isHit={this.state.isHit}
          animationName={this.state.animationName}
          innerRef={el => (this.threadEl = el)}
        >
          <Pinata src="/static/img/pinata.png" onClick={this.handleClick} />
        </Thread>
        {this.state.isSwinging &&
          this.props.hitsRemaining > 0 &&
          this.state.isHit &&
          <Whack src="/static/img/whack.png" />}
        {this.state.isSwinging &&
          !this.state.isHit &&
          <Miss src="/static/img/miss.png" />}
        {this.state.isSwinging &&
          this.props.hitsRemaining <= 0 &&
          <Explode src="/static/img/explode.png" />}
      </Div>
    )
  }
}
