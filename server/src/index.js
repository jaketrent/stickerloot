import 'module-alias/register'

import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { renderStatic } from 'glamor/server'

import Index from '@shared/index'

const app = express()
const port = process.env.PORT || 3001
const staticDir = path.join(__dirname, '..', '..', 'client', 'dist')

const render = App => {
  const { html, css, ids } = renderStatic(() => ReactDOM.renderToString(App))

  return `
  <html>
    <head>
      <title>Sticker Loot | NewInReact.com</title>
      <link rel="stylesheet" href="/static/css/styles.css" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>${css}</style>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>window._glam = ${JSON.stringify(ids)}</script>
      <script src="/static/index.js"></script>
    </body>
  </html>
`
}

app.get('/', (req, res) => {
  res.send(render(<Index />))
})

app.use('/static', express.static(staticDir))

app.listen(port, _ => console.log(`Listening on ${port}...`))
