import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("TodoListTasks", (table) => {
    table.string("id").primary();
    table.string("title", 255).notNullable();
    table.text("description").notNullable();
    table.date("limit_date");
    table.string("status").notNullable();
    table
      .string("user_creator_id")
      .notNullable()
      .references("id")
      .inTable("TodoListUsers");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("TodoListTasks");
}
