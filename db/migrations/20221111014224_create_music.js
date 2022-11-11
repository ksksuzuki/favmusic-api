/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('music', function (table) {
    table.increments('id').primary() // Set this column as the primary key
    table.string('name', 64).unique().notNullable()
    table.string('artist', 64).notNullable()
    table.integer('genre_id')
    table.foreign('genre_id').references('genre.id')
    table.string('description', 255)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('music')
}
