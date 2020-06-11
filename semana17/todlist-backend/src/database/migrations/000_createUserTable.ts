import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("TodoListUsers", (table) => {
    table.string("id").primary();
    table.string("name", 255).notNullable();
    table.string("nickname", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("TodoListUsers");
}
