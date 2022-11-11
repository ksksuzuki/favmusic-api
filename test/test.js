const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { setupServer } = require('../src/server')
const { expect } = chai
const knex = require('../src/knex')

// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should()

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer()
describe('favmusic API Server', () => {
  let request
  beforeEach(async () => {
    request = chai.request(server).keepOpen()
    await knex.seed.run({ directory: './db/seeds' })
  })

  describe('GET /music', () => {
    it('should return all music', async () => {
      const res = await request.get('/music')
      expect(res.status).to.equal(200)
      expect(JSON.parse(res.text).length).to.be.least(1)
    })

    it('should return サカナクション music', async () => {
      const res = await request
        .get('/music')
        .query({ artist: 'サカナクション' })
      const result = JSON.parse(res.text)
      expect(res.status).to.equal(200)
      expect(result.length).to.be.equal(1)
      expect(result[0].artist).to.be.equal('サカナクション')
    })

    it('should return rock music', async () => {
      const res = await request.get('/music').query({ genreId: 1 })
      const result = JSON.parse(res.text)
      expect(res.status).to.equal(200)
      expect(result.length).to.be.equal(1)
      expect(result[0].genreId).to.be.equal(1)
    })
  })

  describe('POST /music', () => {
    it('should register music', async () => {
      const body = {
        name: '表参道26時',
        artist: 'サカナクション',
        genreId: 1,
        description: 'いいよね',
      }
      const res = await request.post('/music').send(body)
      expect(res.status).to.equal(201)
    })

    it('should register no genre and description music', async () => {
      const body = {
        name: 'フクロウ',
        artist: 'サカナクション',
      }
      const res = await request.post('/music').send(body)
      expect(res.status).to.equal(201)
    })
  })

  describe('PATCH /music/:id', () => {
    it('should update music', async () => {
      const getRes = await request.get('/music')
      const result = JSON.parse(getRes.text)
      const res = await request
        .patch(`/music/${result[0].id}`)
        .send({ description: 'テストで変更したよ' })
      expect(res.status).to.equal(200)

      const getRes2 = await request.get('/music')
      expect(
        JSON.parse(getRes2.text).filter((music) => music.id === result[0].id)[0]
          .description
      ).to.equal('テストで変更したよ')
    })
  })

  describe('DELETE /music/:id', () => {
    it('should delete music', async () => {
      const getRes = await request.get('/music')
      const result = JSON.parse(getRes.text)
      const res = await request.delete(`/music/${result[0].id}`)
      expect(res.status).to.equal(200)

      const getRes2 = await request.get('/music')
      expect(
        JSON.parse(getRes2.text).filter((music) => music.id === result[0].id)
          .length
      ).to.equal(0)
    })

    it('should return error if delete favorited music', async () => {
      await request.post('/user/1/favorite').send({ musicId: 1 })
      const res = await request.delete(`/music/1`)
      expect(res.status).to.equal(500)
      const getRes = await request.get('/music').query({ id: 1 })
      expect(JSON.parse(getRes.text).length).to.equal(1)
    })
  })

  describe('GET /user/:id', () => {
    it('should return user', async () => {
      const res = await request.get('/user/1')
      expect(res.status).to.equal(200)
      JSON.parse(res.text).should.deep.equal({
        id: 1,
        name: 'keisuke',
        email: 'keisuke@test.com',
        description: '一介のエンジニア',
        favorites: [],
      })
    })

    it('should return user with favorite music', async () => {
      await request.post('/user/1/favorite').send({ musicId: 1 })
      const res = await request.get('/user/1')
      expect(res.status).to.equal(200)
      JSON.parse(res.text).should.deep.equal({
        id: 1,
        name: 'keisuke',
        email: 'keisuke@test.com',
        description: '一介のエンジニア',
        favorites: [
          {
            id: 1,
            name: '新宝島',
            artist: 'サカナクション',
            genreId: 1,
            description: '神曲',
          },
        ],
      })
    })
  })

  describe('POST /user', () => {
    it('should register user', async () => {
      const body = {
        name: 'テスト',
        email: 'test@test.com',
        password: 'password',
        description: 'テストユーザです',
      }
      const res = await request.post('/user').send(body)
      expect(res.status).to.equal(201)
    })
  })

  describe('PATCH /user/:id', () => {
    it('should update user', async () => {
      const res = await request
        .patch('/user/1')
        .send({ description: 'テストで変更したよ' })
      expect(res.status).to.equal(200)

      const getRes = await request.get('/user/1')
      expect(JSON.parse(getRes.text).description).to.equal('テストで変更したよ')
    })
  })

  describe('POST /user/:id/favorite', () => {
    it('should register favorite music', async () => {
      const res = await request.post('/user/1/favorite').send({ musicId: 1 })
      expect(res.status).to.equal(201)
    })
  })
})
