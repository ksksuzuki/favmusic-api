const knex = require('../knex')

const GENERE_TABLE = 'genre'

module.exports = {
  GENERE_TABLE,

  get() {
    return knex.select().from(GENERE_TABLE)
  },

  register(genre) {
    // validateRequired(validateProps(genre))
    return knex(GENERE_TABLE).insert(genre)
  },
}
