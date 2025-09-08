
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('individual_context').del()
  await knex('individual_context').insert([
    {
      user_id: 1,
      context: JSON.stringify({
        "fullName": "Alice Anderson",
        "role": "Senior Software Engineer",
        "skills": ["TypeScript", "React", "Node.js"]
      })
    },
    {
      user_id: 2,
      context: JSON.stringify({
        "fullName": "Bob Brown",
        "role": "Software Engineer",
        "skills": ["Python", "Django", "Flask"]
      })
    },
    {
      user_id: 3,
      context: JSON.stringify({
        "fullName": "Charlie Clark",
        "role": "Product Manager",
        "skills": ["Agile", "Scrum", "Jira"]
      })
    }
  ]);
};
