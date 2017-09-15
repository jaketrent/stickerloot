const copy = require('recursive-copy')
const fs = require('fs')
const browserify = require('browserify')
const mkdirp = require('mkdirp')
const path = require('path')
const pathmodify = require('pathmodify')
const watchify = require('watchify')

const entry = path.join(__dirname, '..', 'src', 'index.js')
const output = path.join(__dirname, '..', 'dist', 'index.js')
const outputDir = path.join(__dirname, '..', 'dist')
const shared = path.join(__dirname, '..', '..', 'shared', 'dist')
const staticDir = path.join(__dirname, '..', 'static')

mkdirp.sync(outputDir)

const b = browserify({
  entries: [entry],
  cache: {},
  packageCache: {},
  plugin: process.argv[2] === '--watch' ? [watchify] : []
})
  .plugin(pathmodify, {
    mods: [pathmodify.mod.dir('@shared', shared)]
  })
  .transform('babelify', { presets: ['es2015', 'react'] })

b.on('update', bundle)
bundle()

function bundle() {
  b.bundle().pipe(fs.createWriteStream(output))
}

copy(
  staticDir,
  outputDir,
  {
    overwrite: true
  },
  (err, results) => {
    if (err) return console.log('Error copying static directory', err)

    console.log('Copied ' + results.length + ' files in static directory')
  }
)
