import 'module-alias/register'

import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'

import Component from '@shared/component'

const app = express()
const port = process.env.PORT || 3001

app.get('*', (req, res) => {
  res.send(ReactDOM.renderToString(<Component />))
})

app.listen(port, _ => console.log(`Listening on ${port}...`))
