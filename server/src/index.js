import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'

const app = express()
const port = process.env.PORT || 3001

app.get('*', (req, res) => {
  res.send(ReactDOM.renderToString(<h1>Hola, Reactish</h1>))
})

app.listen(port, _ => console.log(`Listening on ${port}...`))
