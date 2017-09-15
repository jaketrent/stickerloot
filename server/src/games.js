import uuid from 'uuid'

import * as stickers from '@shared/util/stickers'

const games = {}

export const create = _ => {
  const id = uuid.v4()
  const newGame = {
    id,
    hitsRemaining: 3,
    swingsCount: 0,
    swingsRemaining: 8,
    stickers: stickers.initStartingSet()
  }
  games[id] = newGame
  return newGame
}
