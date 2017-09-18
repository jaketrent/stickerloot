import glamorous from 'glamorous'
import React from 'react'

import Actions from './ui/actions'
import GameOver from './ui/game-over'
import Pinata from './ui/pinata'
import Stats from './ui/stats'
import * as stickers from './util/stickers'
import Stickers from './ui/stickers'
import TopNav from './ui/topnav'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hitsRemaining: 3,
      crackedStickers: [],
      // TODO: maybe consolidate on crackedStickers state?
      isCracked: false,
      swingsCount: 0,
      swingsRemaining: 8,
      stickers: stickers.initStartingSet()
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleSwing = this.handleSwing.bind(this)
    this.handleTrade = this.handleTrade.bind(this)
  }
  handleReset() {
    this.setState({
      hitsRemaining: 3,
      crackedStickers: [],
      isCracked: false
    })
  }
  handleSwing(isHit) {
    const hitsRemaining = this.state.hitsRemaining - (isHit ? 1 : 0)
    const crackedStickers = stickers.random()
    this.setState({
      hitsRemaining,
      swingsCount: this.state.swingsCount + 1,
      swingsRemaining: this.state.swingsRemaining - 1,
      ...(hitsRemaining === 0
        ? {
            crackedStickers,
            isCracked: true,
            stickers: crackedStickers.reduce((acc, sticker) => {
              acc[sticker.id] = {
                ...this.state.stickers[sticker.id],
                count: this.state.stickers[sticker.id].count + 1
              }
              return acc
            }, this.state.stickers)
          }
        : {})
    })
  }
  handleTrade() {
    this.setState({
      swingsRemaining: this.state.swingsRemaining + 8,
      stickers: Object.keys(this.state.stickers).reduce((acc, id) => {
        acc[id] = {
          ...this.state.stickers[id],
          count: this.state.stickers[id].count - 1
        }
        return acc
      }, this.state.stickers)
    })
  }
  render() {
    return (
      <div>
        <TopNav />
        <h1>Welcome</h1>
        <p>
          Here's how you play
        </p>
        <p>
          Start a new game
        </p>
      </div>
    )
  }
}
