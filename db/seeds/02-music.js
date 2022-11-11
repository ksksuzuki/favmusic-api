/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('music').del()
  await knex('music').insert([
    {
      name: '新宝島',
      artist: 'サカナクション',
      genre_id: 1,
      description: '神曲',
    },
    {
      name: 'SUN',
      artist: '星野源',
      genre_id: 2,
      description: 'いい曲',
    },
  ])
}
