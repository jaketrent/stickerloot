import 'module-alias/register'

import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { renderStatic } from 'glamor/server'

import Component from '@shared/component'

const app = express()
const port = process.env.PORT || 3001
const staticDir = path.join(__dirname, '..', '..', 'client', 'dist')

const render = App => {
  const { html, css, ids } = renderStatic(() => ReactDOM.renderToString(App))

  return `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/static/index.js"></script>
    </body>
  </html>
`
}

app.get('/', (req, res) => {
  res.send(
    render(
      <div>
        <Component>ONE</Component>
      </div>
    )
  )
})

app.use('/static', express.static(staticDir))

app.listen(port, _ => console.log(`Listening on ${port}...`))
