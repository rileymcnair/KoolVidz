const express = require('express')
const fs = require('fs')
const path = require('path')

const DB = require('./database')
const DAL = require('./data_access_layer')

const app = express()

app.get('/video', (req, res) => {
  res.sendFile('database-design.txt', { root: __dirname })
})

app.get('/test', async (req, res) => {
  const value = await DAL.get_video_comments(10)
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
