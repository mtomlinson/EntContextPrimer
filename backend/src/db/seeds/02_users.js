
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {email: 'user1@example.com', team_id: 1},
    {email: 'user2@example.com', team_id: 1},
    {email: 'user3@example.com', team_id: 2}
  ]);
};
