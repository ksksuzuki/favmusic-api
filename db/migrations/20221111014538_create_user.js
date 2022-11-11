/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary() // Set this column as the primary key
    table.string('name', 64).notNullable()
    table.string('email', 64).unique().notNullable()
    table.string('password', 64).notNullable()
    table.string('description', 255)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('user')
}
