import express from 'express'

const app = express()
const port = process.env.PORT || 3001

app.get('*', (req, res) => res.json({ wow: 'zers' }))

app.listen(port, _ => console.log(`Listening on ${port}...`))
