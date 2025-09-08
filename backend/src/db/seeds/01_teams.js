
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 1, name: 'Team Alpha'},
    {id: 2, name: 'Team Bravo'},
    {id: 3, name: 'Team Charlie'}
  ]);
};
