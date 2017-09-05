import glamorous from 'glamorous'
import React from 'react'

import Play from './pages/play'
import End from './pages/end'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swingsCount: 0,
      swingsRemaining: 8,
      // TODO: pull from the set
      stickers: {
        cyclops: {
          src: '/static/img/cyclops.png',
          count: 0
        },
        muertos: {
          src: '/static/img/muertos.png',
          count: 0
        },
        squid: {
          src: '/static/img/squid.png',
          count: 0
        }
      }
    }
    this.handleSwing = this.handleSwing.bind(this)
    this.handleStickers = this.handleStickers.bind(this)
  }
  handleSwing() {
    this.setState({
      swingsCount: this.state.swingsCount + 1,
      swingsRemaining: this.state.swingsRemaining - 1
    })
  }
  handleStickers(stickers) {
    this.setState({
      stickers: stickers.reduce((acc, sticker) => {
        acc[sticker.id] = {
          ...this.state.stickers[sticker.id],
          count: this.state.stickers[sticker.id].count + 1
        }
        return acc
      }, this.state.stickers)
    })
  }
  render() {
    return (
      <div>
        {(this.state.swingsRemaining > 0 ||
          Object.keys(this.state.stickers).every(s => s.count > 0)) &&
          <Play
            onSwing={this.handleSwing}
            onStickers={this.handleStickers}
            swingsRemaining={this.state.swingsRemaining}
            stickers={this.state.stickers}
          />}
        {this.state.swingsRemaining <= 0 &&
          !Object.keys(this.state.stickers).every(s => s.count > 0) &&
          <End
            stickers={this.state.stickers}
            swingsCount={this.state.swingsCount}
            swingsRemaining={this.state.swingsRemaining}
          />}
      </div>
    )
  }
}
