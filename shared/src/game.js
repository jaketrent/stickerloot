import 'babel-polyfill'
import 'isomorphic-fetch'

import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

import Actions from './ui/actions'
import GameOver from './ui/game-over'
import Pinata from './ui/pinata'
import Stats from './ui/stats'
import * as stickers from './util/stickers'
import Stickers from './ui/stickers'
import TopNav from './ui/topnav'

const saveGameState = async game => {
  return fetch('http://localhost:3001/api/games/' + game.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(game)
  })
}

const extractGame = state =>
  state.gameStateKeys.reduce((acc, key) => {
    acc[key] = state[key]
    return acc
  }, {})

const Game = React.createClass({
  getInitialState() {
    return {
      ...this.props.serverState.game,
      gameStateKeys: Object.keys(this.props.serverState.game),
      crackedStickers: []
    }
  },
  handleReset() {
    this.setState(
      {
        hitsRemaining: 3,
        crackedStickers: []
      },
      _ => saveGameState(extractGame(this.state))
    )
  },
  handleSwing(isHit) {
    const hitsRemaining = this.state.hitsRemaining - (isHit ? 1 : 0)
    const crackedStickers = stickers.random()
    this.setState(
      {
        hitsRemaining,
        swingsCount: this.state.swingsCount + 1,
        swingsRemaining: this.state.swingsRemaining - 1,
        ...(hitsRemaining === 0
          ? {
              crackedStickers,
              stickers: crackedStickers.reduce((acc, sticker) => {
                acc[sticker.id] = {
                  ...this.state.stickers[sticker.id],
                  count: this.state.stickers[sticker.id].count + 1
                }
                return acc
              }, this.state.stickers)
            }
          : {})
      },
      _ => saveGameState(extractGame(this.state))
    )
  },
  handleTrade() {
    this.setState(
      {
        swingsRemaining: this.state.swingsRemaining + 8,
        stickers: Object.keys(this.state.stickers).reduce((acc, id) => {
          acc[id] = {
            ...this.state.stickers[id],
            count: this.state.stickers[id].count - 1
          }
          return acc
        }, this.state.stickers)
      },
      _ => saveGameState(extractGame(this.state))
    )
  },
  render() {
    return (
      <div>
        <TopNav gameIds={this.props.serverState.gameIds} />
        {this.state.swingsRemaining > 0 && [
          <Pinata
            key="pinata"
            hitsRemaining={this.state.hitsRemaining}
            isCracked={this.state.crackedStickers.length > 0}
            onSwing={this.handleSwing}
          />,
          <Stickers key="stickers" stickers={this.state.crackedStickers} />
        ]}
        {this.state.swingsRemaining <= 0 &&
          !Object.keys(this.state.stickers).every(
            id => this.state.stickers[id].count > 0
          ) &&
          <GameOver swingsCount={this.state.swingsCount} />}
        <Stats
          swingsRemaining={this.state.swingsRemaining}
          stickers={this.state.stickers}
        />
        <Actions
          isCracked={this.state.crackedStickers.length > 0}
          onReset={this.handleReset}
          onTrade={this.handleTrade}
          stickers={this.state.stickers}
        />
      </div>
    )
  }
})

Game.propTypes = {
  serverState: PropTypes.shape({
    gameIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    game: PropTypes.shape({
      id: PropTypes.string.isRequired,
      hitsRemaining: PropTypes.number.isRequired,
      swingsCount: PropTypes.number.isRequired,
      swingsRemaining: PropTypes.number.isRequired,
      stickers: PropTypes.object.isRequired
    })
  }).isRequired
}

export default Game
