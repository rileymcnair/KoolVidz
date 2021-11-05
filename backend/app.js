const express = require('express')
const fs = require('fs')
const path = require('path')

const DB = require('./database')

const app = express()

app.get('/video', (req, res) => {
  res.sendFile('database-design.txt', { root: __dirname })
})

app.get('/test', (req, res) => {
  console.log('Test triggered')
  const db = new DB()
  db.connect()
  db.get()
  db.close()
})

app.listen(4000, () => {
  console.log('Listening on port 4000!')
  console.log(process.versions)
})
