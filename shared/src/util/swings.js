import * as glamor from 'glamor'

import * as random from './random'

// prettier-ignore
const swings = [
  [
    [0, 0],
    [15, 45],
    [40, -45],
    [65, 25],
    [85, -10],
    [95, 2],
    [100, 0]
  ],
  [
    [0, 0],
    [10, -50],
    [30, 40],
    [45, -20],
    [55, 15],
    [70, -10],
    [85, 4],
    [95, -2],
    [100, 0]
  ]
]

const asKeyFrame = timings =>
  glamor.css.keyframes(
    timings.reduce((acc, t) => {
      acc[t[0] + '%'] = { transform: `rotate(${t[1]}deg)` }
      return acc
    }, {})
  )

export const asRandomKeyFrame = _ =>
  asKeyFrame(swings[random.int(0, swings.length)])

export const first = _ => asKeyFrame(swings[0])
