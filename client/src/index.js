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
        render={props => <Index {...props} serverState={window._serverState} />}
      />
      <Route
        exact
        path="/games/:id"
        render={props => <Game {...props} serverState={window._serverState} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
