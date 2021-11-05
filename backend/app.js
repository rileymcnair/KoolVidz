const express = require('express')
const fs = require('fs')
const path = require('path')

const DB = require('./database')

const app = express()

app.get('/video', (req, res) => {
  res.sendFile('database-design.txt', { root: __dirname })
})

app.get('/onboard', async (req, res) => {
  const db = new DB()
  await db.create()
  res.sendStatus(200)
})

app.listen(4000, () => {
  console.log('Listening on port 4000!')
})
