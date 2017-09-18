import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'

import Index from '@shared/index'
import Game from '@shared/game'

rehydrate(window._glam)
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={props => <Index {...props} game={window._game} />}
      />
      <Route
        exact
        path="/new"
        render={props => <Game {...props} game={window._game} />}
      />
      <Route
        exact
        path="/games/:id"
        render={props => <Game {...props} game={window._game} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
