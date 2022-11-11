/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      id: 1,
      name: 'keisuke',
      email: 'keisuke@test.com',
      password: 'password',
      description: '一介のエンジニア',
    },
  ])
}
