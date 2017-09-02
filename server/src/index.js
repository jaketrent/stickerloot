import 'module-alias/register'

import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { renderStatic } from 'glamor/server'
import { rehydrate } from 'glamor'

import Component from '@shared/component'

const app = express()
const port = process.env.PORT || 3001

const render = App => {
  const { html, css, ids } = renderStatic(() => ReactDOM.renderToString(App))

  return `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="./bundle.js"></script>
      <script>
        rehydrate(${JSON.stringify(ids)});
        render(<App />, document.getElementById('app'));
      </script>
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

app.listen(port, _ => console.log(`Listening on ${port}...`))
