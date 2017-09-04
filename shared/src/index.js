import glamorous from 'glamorous'
import React from 'react'

import Play from './pages/play'
import End from './pages/end'

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
        {(this.state.swingsRemaining > 0 ||
          Object.keys(this.state.stickers).every(s => s.count > 0)) &&
          <Play
            onSwing={this.handleSwing}
            swingsRemaining={this.state.swingsRemaining}
            stickers={this.state.stickers}
          />}
        {this.state.swingsRemaining <= 0 &&
          !Object.keys(this.state.stickers).every(s => s.count > 0) &&
          <End />}
      </div>
    )
  }
}
