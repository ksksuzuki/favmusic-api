const knex = require('../knex')
const { validProps, requiredProps } = require('../util/validation')

const validateProps = validProps([
  'id',
  'name',
  'artist',
  'genre_id',
  'description',
])

const validateRequired = requiredProps(['name', 'artist'])

const MUSIC_TABLE = 'music'

module.exports = {
  MUSIC_TABLE,

  getAll() {
    return knex
      .select({
        id: 'id',
        name: 'name',
        artist: 'artist',
        genreId: 'genre_id',
        description: 'description',
      })
      .from(MUSIC_TABLE)
  },

  getFilterdMusic(filter) {
    return knex
      .select({
        id: 'id',
        name: 'name',
        artist: 'artist',
        genreId: 'genre_id',
        description: 'description',
      })
      .from(MUSIC_TABLE)
      .where(filter)
  },

  create(music) {
    validateRequired(validateProps(music))
    return knex(MUSIC_TABLE).returning('id').insert(music)
  },

  update(id, music) {
    validateProps(music)
    return knex(MUSIC_TABLE).returning('id').where('id', id).update(music)
  },

  remove(id) {
    return knex(MUSIC_TABLE).returning('id').where('id', id).del()
  },
}
