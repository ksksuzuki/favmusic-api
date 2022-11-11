const express = require('express')
const musicModel = require('./music/music.model')
const userModel = require('./user/user.model')

const setupServer = () => {
  const app = express()
  app.use(express.json())

  app.get('/music', async (req, res) => {
    const music = await musicModel.getAll()
    res.json(music)
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
    const { body } = req
    try {
      if (!isNaN(id)) {
        await musicModel.update(id, body)
        res.status(200).end()
      } else {
        throw new Error()
      }
    } catch {
      res.status(500).end()
    }
  })

  app.delete('/music/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      if (!isNaN(id)) {
        await musicModel.remove(id)
        res.status(200).end()
      } else {
        throw new Error()
      }
    } catch {
      res.status(500).end()
    }
  })

  app.get('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      if (!isNaN(id)) {
        const user = await userModel.getById(id)
        res.json(user)
      } else {
        throw new Error()
      }
    } catch {
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
    } catch {
      res.status(500).end()
    }
  })

  // app.get('/api/pokemon/:idOrName/evolutions', (req, res) => {
  //   const idOrName = parseInt(req.params.idOrName)
  //   let result = []
  //   if (isNaN(idOrName)) {
  //     result = pokeData.pokemon.filter(
  //       (item) => item.name.toUpperCase() === req.params.idOrName.toUpperCase()
  //     )[0].evolutions
  //   } else {
  //     result = pokeData.pokemon.filter(
  //       (item) => parseInt(item.id) === idOrName
  //     )[0].evolutions
  //   }
  //   if (result === undefined) {
  //     res.send([])
  //   } else {
  //     res.send(result)
  //   }
  // })

  return app
}

module.exports = { setupServer }
