const knex = require('../knex')
const { validProps, requiredProps } = require('../util/validation')

const validateProps = validProps(['music_id', 'user_id'])

const validateRequired = requiredProps(['user_id', 'music_id'])

const FAVORITE_TABLE = 'favorite'

module.exports = {
  FAVORITE_TABLE,

  getByMusicId(id) {
    return knex.select().from(FAVORITE_TABLE).where({
      music_id: id,
    })
  },

  getByUserId(id) {
    return knex
      .select({
        id: 'music.id',
        name: 'music.name',
        artist: 'music.artist',
        genreId: 'music.genre_id',
        description: 'music.description',
      })
      .from('music')
      .innerJoin(FAVORITE_TABLE, 'favorite.music_id', 'music.id')
      .where({
        user_id: id,
      })
  },

  register(favorite) {
    validateRequired(validateProps(favorite))
    return knex(FAVORITE_TABLE).insert(favorite)
  },
}
