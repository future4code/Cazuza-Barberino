import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable(
    "TodoListResponsibleUserTaskRelation",
    (table) => {
      table
        .string("task_id")
        .notNullable()
        .references("id")
        .inTable("TodoListTasks");
      table
        .string("user_id")
        .notNullable()
        .references("id")
        .inTable("TodoListUsers");
    }
  );
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("TodoListResponsibleUserTaskRelation");
}
