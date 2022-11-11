/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('favorite', function (table) {
    table.integer('music_id').notNullable()
    table.foreign('music_id').references('music.id')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('user.id')
    table.unique(['music_id', 'user_id'], {
      indexName: 'music_user_index',
    })
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('favorite')
}
