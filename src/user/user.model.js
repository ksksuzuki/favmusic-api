const knex = require('../knex')
const { validProps, requiredProps } = require('../util/validation')

const validateProps = validProps([
  'id',
  'name',
  'email',
  'password',
  'description',
])

const favoriteValidateProps = validProps(['music_id', 'user_id'])

const validateRequired = requiredProps(['name', 'email', 'password'])

const favoriteValidateRequired = requiredProps(['user_id', 'music_id'])

const USER_TABLE = 'user'

const FAVORITE_TABLE = 'favorite'

module.exports = {
  USER_TABLE,

  getById(id) {
    return knex
      .select({
        id: 'id',
        name: 'name',
        email: 'email',
        description: 'description',
      })
      .from(USER_TABLE)
      .where({
        id,
      })
      .first()
  },

  create(user) {
    validateRequired(validateProps(user))
    return knex(USER_TABLE).returning('id').insert(user)
  },

  update(id, user) {
    validateProps(user)
    return knex(USER_TABLE).returning('id').where('id', id).update(user)
  },

  remove(id) {
    return knex(USER_TABLE).returning('id').where('id', id).del()
  },

  favorite(favorite) {
    favoriteValidateRequired(favoriteValidateProps(favorite))
    return knex(FAVORITE_TABLE).insert(favorite)
  },
}
