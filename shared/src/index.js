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
    this.handleReset = this.handleReset.bind(this)
    this.handleSwing = this.handleSwing.bind(this)
    this.handleTrade = this.handleTrade.bind(this)
  }
  handleReset() {
    this.setState({
      hitsRemaining: 3,
      crackedStickers: [],
      isCracked: false,
      stickers: this.state.crackedStickers.reduce((acc, sticker) => {
        acc[sticker.id] = {
          ...this.state.stickers[sticker.id],
          count: this.state.stickers[sticker.id].count + 1
        }
        return acc
      }, this.state.stickers)
    })
  }
  handleSwing(isHit) {
    const hitsRemaining = this.state.hitsRemaining - (isHit ? 1 : 0)
    this.setState({
      hitsRemaining,
      swingsCount: this.state.swingsCount + 1,
      swingsRemaining: this.state.swingsRemaining - 1,
      ...(hitsRemaining === 0
        ? {
            crackedStickers: stickers.random(),
            isCracked: true
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
        {this.state.swingsRemaining > 0 &&
          <Pinata
            hitsRemaining={this.state.hitsRemaining}
            isCracked={this.state.isCracked}
            onSwing={this.handleSwing}
          />}
        {this.state.swingsRemaining <= 0 &&
          !Object.keys(this.state.stickers).every(s => s.count > 0) &&
          <GameOver swingsCount={this.state.swingsCount} />}
        <Stickers stickers={this.state.crackedStickers} />
        <Actions
          isCracked={this.state.isCracked}
          onReset={this.handleReset}
          onTrade={this.handleTrade}
          stickers={this.state.stickers}
        />
        <Stats
          swingsRemaining={this.state.swingsRemaining}
          stickers={this.state.stickers}
        />
      </div>
    )
  }
}
