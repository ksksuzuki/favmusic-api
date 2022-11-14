const express = require('express')
const musicModel = require('./music/music.model')
const userModel = require('./user/user.model')
const favoriteModel = require('./favorite/favorite.model')
const loginModel = require('./login/login.model')
const genreModel = require('./genre/genre.model')

const setupServer = () => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.get('/music', async (req, res) => {
    const { query } = req
    const filter = {}

    Object.keys(query).forEach((key) => {
      key === 'genreId'
        ? (filter.genre_id = query[key])
        : (filter[key] = query[key])
    })
    try {
      const result =
        Object.keys(filter).length === 0
          ? await musicModel.getAll()
          : await musicModel.getFilterdMusic(filter)

      res.json(result)
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.post('/music', async (req, res) => {
    const { name, artist, genreId, description } = req.body

    const payload = {
      name,
      artist,
      genre_id: genreId,
      description,
    }

    try {
      await musicModel.create(payload)
      res.status(201).end()
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.patch('/music/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, artist, genreId, description } = req.body

    const payload = {
      name,
      artist,
      genre_id: genreId,
      description,
    }
    try {
      if (!isNaN(id)) {
        await musicModel.update(id, payload)
        res.status(200).end()
      } else {
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.delete('/music/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(req.params)
    try {
      if (!isNaN(id)) {
        const favoriteList = await favoriteModel.getByMusicId(id)
        if (favoriteList.length >= 1)
          throw new Error('target music is favorited by anyone')
        await musicModel.remove(id)
        res.status(200).end()
      } else {
        console.log('ohh')
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.get('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      if (!isNaN(id)) {
        const user = await userModel.getById(id)
        const favorites = await favoriteModel.getByUserId(id)
        user.favorites = favorites
        res.json(user)
      } else {
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.post('/user', async (req, res) => {
    const { name, email, password, description } = req.body

    const payload = {
      name,
      email,
      password,
      description,
    }

    try {
      await userModel.create(payload)
      res.status(201).end()
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.patch('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const { body } = req
    try {
      if (!isNaN(id)) {
        await userModel.update(id, body)
        res.status(200).end()
      } else {
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.post('/user/:id/favorite', async (req, res) => {
    const userId = parseInt(req.params.id)
    const { musicId } = req.body

    const payload = {
      music_id: musicId,
      user_id: userId,
    }

    try {
      if (!isNaN(userId)) {
        await favoriteModel.register(payload)
        res.status(201).end()
      } else {
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.get('/login/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      if (!isNaN(id)) {
        const login = await loginModel.get(id)
        res.json({ login: login.length !== 0 })
      } else {
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await userModel.getCredential(email)

      if (user.email === email && user.password === password) {
        const login = await loginModel.get(user.id)
        if (login.length === 0) {
          await loginModel.register(user.id)
        }
        res.json({ id: user.id })
      } else {
        throw new Error('invalid credential')
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.delete('/login/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      if (!isNaN(id)) {
        await loginModel.remove(id)
        res.status(200).end()
      } else {
        throw new Error()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.get('/genre', async (req, res) => {
    try {
      const genre = await genreModel.get()
      res.json(genre)
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  app.post('/genre', async (req, res) => {
    try {
      const result = await genreModel.register(req.body)
      res.json(result)
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  })

  return app
}

module.exports = { setupServer }
