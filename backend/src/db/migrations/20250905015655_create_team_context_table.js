/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('team_context', function(table) {
    table.increments('id').primary();
    table.integer('team_id').unsigned().notNullable().references('id').inTable('teams').onDelete('CASCADE');
    table.json('context').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('team_context');
};
