import * as glamor from 'glamor'

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
    [10, -35],
    [20, 40],
    [45, -20],
    [55, 12],
    [70, -5],
    [85, 3],
    [95, -1],
    [100, 0]
  ]
]

const rand = (min = 0, max = 1) => Math.floor(Math.random() * (max - min)) + min

const asKeyframe = timings =>
  glamor.css.keyframes(
    timings.reduce((acc, t) => {
      acc[t[0] + '%'] = { transform: `rotate(${t[1]}deg)` }
      return acc
    }, {})
  )

export const asRandomKeyFrame = _ => asKeyframe(swings[rand(0, swings.length)])
