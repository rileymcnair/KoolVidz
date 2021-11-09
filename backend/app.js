const express = require('express')
const fs = require('fs')
const path = require('path')

const DB = require('./database')
const DAL = require('./data_access_layer')
const SE = require('./search_engine')

const app = express()

app.get('/video', (req, res) => {
  res.sendFile('database-design.txt', { root: __dirname })
})

app.get('/test', async (req, res) => {
  const value = await SE.search('1 2 3 4 5 6 7 8 9 10 11', 1000)
  console.log(value)
  res.sendStatus(200)
})

app.get('/onboard', async (req, res) => {
  const db = new DB()
  try {
    await db.create()
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

app.listen(4000, () => {
  console.log('Listening on port 4000!')
})
