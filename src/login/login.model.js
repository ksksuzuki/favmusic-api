const knex = require('../knex')
// const { validProps, requiredProps } = require('../util/validation')

// const validateProps = validProps(['user_id'])

// const validateRequired = requiredProps(['user_id'])

const LOGIN_TABLE = 'login'

module.exports = {
  LOGIN_TABLE,

  get(id) {
    return knex.select().from(LOGIN_TABLE).where({
      user_id: id,
    })
  },

  register(id) {
    return knex(LOGIN_TABLE).insert({ user_id: id })
  },

  remove(id) {
    return knex(LOGIN_TABLE).where('user_id', id).del()
  },
}
