import * as randomUtil from './random'

export const theSet = {
  cyclops: {
    id: 'cyclops',
    src: '/static/img/cyclops.png'
  },
  muertos: {
    id: 'muertos',
    src: '/static/img/muertos.png'
  },
  squid: {
    id: 'squid',
    src: '/static/img/squid.png'
  }
}
const ids = Object.keys(theSet)

export const random = _ =>
  [1, 2, 3].map(i => theSet[ids[randomUtil.int(0, ids.length)]])
