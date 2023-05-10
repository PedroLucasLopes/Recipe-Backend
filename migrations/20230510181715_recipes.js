/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Recipes Table
  return knex.schema
    .createTable('recipes', (table) => {
      table.increments('id').primary();
      table.string('recipe_name', 255).notNullable();
      table.string('recipe_description', 500).notNullable();
      table.string('recipe_method', 500).notNullable();
    })
    .createTable('recipe_supply', (table) => {
      table.increments('id').primary();
      table.integer('id_recipes').notNullable();
      table.string('recipe_supplies', 600).notNullable();
      table.foreign('id_recipes').references('id').inTable('recipes');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('recipes').dropTable('recipe-supply');
};
