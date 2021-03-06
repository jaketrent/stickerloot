import 'module-alias/register'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { renderStatic } from 'glamor/server'
import { Route, StaticRouter, Switch } from 'react-router'

import Index from '@shared/index'
import Game from '@shared/game'

import * as games from './games'

const app = express()
const port = process.env.PORT || 3001
const staticDir = path.join(__dirname, '..', '..', 'client', 'dist')

const render = (App, serverState) => {
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
      <script>window._serverState = ${JSON.stringify(serverState)}</script>
      <script src="/static/index.js"></script>
    </body>
  </html>
`
}

const send = (req, res) => {
  const { serverState } = req
  res.send(
    render(
      <StaticRouter context={{}} location={req.url}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Index {...props} serverState={serverState} />}
          />
          <Route
            exact
            path="/games/:id"
            render={props => <Game {...props} serverState={serverState} />}
          />
        </Switch>
      </StaticRouter>,
      serverState
    )
  )
}

app.get(
  '/',
  (req, res, next) => {
    req.serverState = { gameIds: games.allIds() }
    next()
  },
  send
)
app.get('/new', (req, res) => {
  const search = req.query.lang ? `?lang=${req.query.lang}` : ''
  res.redirect(`/games/${games.create().id}${search}`)
})
app.get(
  '/games/:id',
  (req, res, next) => {
    const game = games.find(req.params.id)
    if (!game) return res.redirect(301, '/')

    req.serverState = {
      game,
      gameIds: games.allIds()
    }
    next()
  },
  send
)

app.use('/api', cors({ origin: '*' }))
app.use('/api', bodyParser.json())
app.put('/api/games/:id', (req, res) => {
  res.status(200).json(games.update(req.params.id, req.body))
})

app.use('/static', express.static(staticDir))

app.listen(port, _ => console.log(`Listening on ${port}...`))
