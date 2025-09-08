
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('team_context').del()
  await knex('team_context').insert([
    {
      team_id: 1,
      context: JSON.stringify({
        "teamName": "Team Alpha",
        "mandate": "To build and maintain the core infrastructure.",
        "currentProjects": ["Project Phoenix", "Project Cerberus"]
      })
    },
    {
      team_id: 2,
      context: JSON.stringify({
        "teamName": "Team Bravo",
        "mandate": "To develop new user-facing features.",
        "currentProjects": ["Project Griffin", "Project Hydra"]
      })
    }
  ]);
};
