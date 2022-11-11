/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('favorite').del()
  await knex('music').del()
  await knex('genre').del()
  await knex('genre').insert([
    { id: 1, name: 'ロック' },
    { id: 2, name: 'Jポップ' },
    { id: 3, name: 'ジャズ' },
  ])
}
