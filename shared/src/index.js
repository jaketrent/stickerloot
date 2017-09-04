import glamorous from 'glamorous'
import React from 'react'

import TopNav from './ui/topnav'
import Pinata from './ui/pinata'
import Stats from './ui/stats'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swingsRemaining: 3,
      stickers: {
        cyclops: {
          src: '/static/img/cyclops.png',
          count: 3
        },
        muertos: {
          src: '/static/img/muertos.png',
          count: 3
        },
        squid: {
          src: '/static/img/squid.png',
          count: 3
        }
      }
    }
    this.handleSwing = this.handleSwing.bind(this)
  }
  handleSwing() {
    this.setState({ swingsRemaining: this.state.swingsRemaining - 1 })
  }
  render() {
    return (
      <div>
        <TopNav />
        <Pinata onSwing={this.handleSwing} />
        <Stats
          swings={this.state.swingsRemaining}
          stickers={this.state.stickers}
        />
      </div>
    )
  }
}
