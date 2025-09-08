
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('company_context').del()
  await knex('company_context').insert([
    {
      context: JSON.stringify({
        "companyName": "Primer Inc.",
        "missionStatement": "To build the best enterprise software in the world.",
        "values": ["Innovation", "Customer First", "Integrity"]
      })
    }
  ]);
};
