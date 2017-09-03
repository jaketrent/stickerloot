import * as glamor from 'glamor'
import glamorous, { Div } from 'glamorous'
import React from 'react'

import * as swings from '../util/swings'

const bgColor = '#caaa65'

const Pinata = glamorous.img({
  position: 'absolute',
  bottom: '-30vw',
  left: '-30vw',
  display: 'inline-block',
  height: '50vw'
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
  ({ animationName }) => ({
    animation: `${animationName} 2.5s ease-in-out infinite forwards paused`
  }),
  ({ isSwinging }) =>
    isSwinging
      ? {
          animationPlayState: 'running'
        }
      : {}
)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSwinging: false,
      animationName: swings.asRandomKeyFrame()
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(evt) {
    evt.preventDefault()
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      animationName: swings.asRandomKeyFrame(),
      isSwinging: true
    })
    this.timer = setTimeout(_ => this.setState({ isSwinging: false }), 2500)
  }
  render() {
    return (
      <Div position="relative">
        <Thread
          isSwinging={this.state.isSwinging}
          animationName={this.state.animationName}
        >
          <Pinata src="/static/img/pinata.png" onClick={this.handleClick} />
        </Thread>
      </Div>
    )
  }
}
