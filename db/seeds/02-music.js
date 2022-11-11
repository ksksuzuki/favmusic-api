/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('favorite').del()
  await knex('music').del()
  await knex('music').insert([
    {
      id: 1,
      name: '新宝島',
      artist: 'サカナクション',
      genre_id: 1,
      description: '神曲',
    },
    {
      id: 2,
      name: 'SUN',
      artist: '星野源',
      genre_id: 2,
      description: 'いい曲',
    },
  ])
}
