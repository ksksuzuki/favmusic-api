const knex = require('../knex')
const { validProps, requiredProps } = require('../util/validation')

const validateProps = validProps([
  'id',
  'name',
  'email',
  'password',
  'description',
])

const validateRequired = requiredProps(['name', 'email', 'password'])

const USER_TABLE = 'user'

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
        id: id,
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
}
