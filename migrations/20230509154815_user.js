/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('user_email', 255).notNullable();
    table.string('user_password', 255).notNullable();
    table.string('user_username', 255).notNullable();
    table.string('user_city', 255);
    table.string('user_country', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('user');
};
