const express = require('express')
const requestIp = require('request-ip')
const multer = require('multer')

const DB = require('./database')
const DAL = require('./data_access_layer')
const SE = require('./search_engine')

const app = express()
const router = express.Router()
const upload = multer({ dest: './videos' })
const cors = require('cors')

function is_valid_video_id (video_id) {
  return /^\d+$/.test(video_id)
}

router.post('/video/create', upload.single('video'), async (req, res) => {
  const { title } = req.query
  const { description } = req.query

  if (!req.file || !title || !description) {
    res.sendStatus(400)
    return
  }

  const { filename } = req.file

  const id = await DAL.create_video(title, description, filename)
  res.status(200).json(id)
})

router.get('/video/get', async (req, res) => {
  const { video_id } = req.query

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  await DAL.increment_video_views(video_id)
  const video = await DAL.get_video(video_id)

  if (!video) {
    res.sendStatus(404)
    return
  }

  res.status(200).json(video)
})

router.get('/video/search', async (req, res) => {
  const { search_str } = req.query
  const results = await SE.search(search_str || '')

  res.status(200).json(results)
})

router.post('/rating/create', async (req, res) => {
  const { video_id } = req.query
  const is_like = req.query.is_like == 'true'
  const ip_address = req.clientIp

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  if (!(await DAL.has_video(video_id))) {
    res.sendStatus(404)
    return
  }

  await DAL.delete_rating(video_id, ip_address)
  await DAL.create_rating(video_id, is_like, ip_address)

  res.sendStatus(200)
})

router.get('/rating/get', async (req, res) => {
  const { video_id } = req.query

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  const rating = await DAL.get_video_ratings(video_id)

  res.status(200).json(rating)
})

router.get('/rating/has', async (req, res) => {
  const { video_id } = req.query
  const ip_address = req.clientIp

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  const rating = await DAL.has_rating(video_id, ip_address)

  res.status(200).json(rating)
})

router.delete('/rating/delete', async (req, res) => {
  const { video_id } = req.query
  const ip_address = req.clientIp

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  await DAL.delete_rating(video_id, ip_address)

  res.sendStatus(200)
})

router.post('/comment/create', async (req, res) => {
  const { video_id } = req.query
  const { content } = req.query

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  if (!(await DAL.has_video(video_id))) {
    res.sendStatus(404)
    return
  }

  await DAL.create_comment(video_id, content)

  res.sendStatus(200)
})

router.get('/comment/get', async (req, res) => {
  const { video_id } = req.query

  if (!is_valid_video_id(video_id)) {
    res.sendStatus(400)
    return
  }

  const comments = await DAL.get_video_comments(video_id)

  res.status(200).json(comments)
})

router.get('/videos/', (req, res) => {
  res.sendFile('database-design.txt', { root: __dirname })
})

router.get('/onboard', async (req, res) => {
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

app.use('/videos', express.static('videos'))

app.use(cors())

app.listen(6000, () => {
  console.log('App started on port 6000')
})
