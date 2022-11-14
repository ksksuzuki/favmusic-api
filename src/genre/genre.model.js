const knex = require('../knex')

const GENERE_TABLE = 'genre'

module.exports = {
  GENERE_TABLE,

  get() {
    return knex.select().from(GENERE_TABLE)
  },

  register(genre) {
    return knex(GENERE_TABLE).returning('id').insert(genre)
  },
}
