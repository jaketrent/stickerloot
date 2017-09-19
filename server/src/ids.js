import * as random from '@shared/util/random'

const adjs = [
  'largo',
  'corto',
  'grande',
  'pequeno',
  'delgado',
  'flaco',
  'gordo',
  'pesado',
  'ligero',
  'bonito',
  'feo',
  'limpio',
  'cochino',
  'chueco',
  'encuerado',
  'mojado'
]
const nouns = [
  'milagro',
  'mande',
  'manches',
  'modo',
  'orale',
  'ahorita',
  'luego',
  'aguas',
  'chido',
  'bronca',
  'wey',
  'chavo',
  'ruco',
  'fresa',
  'chilango',
  'chairo',
  'cafre',
  'metiche',
  'tocayo',
  'cochino'
]

// naive, vulnerable to collisions, for demo only
export const generate = _ =>
  adjs[random.int(0, adjs.length)] + '-' + nouns[random.int(0, nouns.length)]
