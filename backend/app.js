const express = require('express')
const fs = require('fs')
const path = require('path')
const requestIp = require('request-ip')

const DB = require('./database')
const DAL = require('./data_access_layer')
const SE = require('./search_engine')

const app = express()
const router = express.Router()

router.post('/video/create', async (req, res) => {
  const { title } = req.headers
  const { description } = req.headers

  const id = await DAL.create_video(title, description)
  res.status(200).json(id)
})

router.get('/video/get', async (req, res) => {
  const { video_id } = req.headers
  await DAL.increment_video_views(video_id)
  const video = await DAL.get_video(video_id)

  res.status(200).json(video)
})

router.get('/video/search', async (req, res) => {
  const { search_str } = req.headers
  const results = await SE.search(search_str)

  res.status(200).json(results)
})

router.post('/rating/create', async (req, res) => {
  const { video_id } = req.headers
  const { is_like } = req.headers
  const ip_address = req.clientIp

  await DAL.delete_rating(video_id, ip_address)
  await DAL.create_rating(video_id, is_like, ip_address)

  res.sendStatus(200)
})

router.get('/rating/get', async (req, res) => {
  const { video_id } = req.headers

  const rating = await DAL.get_video_ratings(video_id)

  res.status(200).json(rating)
})

router.get('/rating/has', async (req, res) => {
  const { video_id } = req.headers
  const ip_address = req.clientIp

  const rating = await DAL.has_rating(video_id, ip_address)

  res.status(200).json(rating)
})

router.delete('/rating/delete', async (req, res) => {
  const { video_id } = req.headers
  const ip_address = req.clientIp

  await DAL.delete_rating(video_id, ip_address)

  res.sendStatus(200)
})

router.post('/comment/create', async (req, res) => {
  const { video_id } = req.headers
  const { content } = req.headers

  await DAL.create_comment(video_id, content)

  res.sendStatus(200)
})

router.get('/comment/get', async (req, res) => {
  const { video_id } = req.headers

  const comments = await DAL.get_video_comments(video_id)

  res.status(200).json(comments)
})

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

app.use(requestIp.mw())

app.use('/api', router)

app.listen(5000, () => {
  console.log('App started on port 5000')
})
