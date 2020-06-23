import knex from "../database/connection";

export default class ResponsibleRepository {
  public static async isUserResponsible(task_id: string, user_id: string) {
    return (
      (
        await knex("TodoListResponsibleUserTaskRelation")
          .where({
            task_id,
            user_id,
          })
          .count("* as cnt")
      )[0].cnt > 0
    );
  }

  public static async addResponsible(task_id: string, user_id: string) {
    await knex("TodoListResponsibleUserTaskRelation").insert({
      task_id,
      user_id,
    });
  }

  public static async removeResponsible(task_id: string, user_id: string) {
    await knex("TodoListResponsibleUserTaskRelation").delete("*").where({
      task_id,
      user_id,
    });
  }

  public static async getResponsibles(task_id: string) {
    return await knex("TodoListResponsibleUserTaskRelation")
      .join("TodoListUsers", {
        "TodoListUsers.id": "TodoListResponsibleUserTaskRelation.user_id",
      })
      .select("TodoListUsers.id", "TodoListUsers.nickname")
      .where({
        task_id,
      });
  }

  public static async deleteResponsibleTask(task_id: string) {
    await knex("TodoListResponsibleUserTaskRelation")
      .delete("*")
      .where({ task_id });
  }

  public static async removeAllResponsibility(user_id: string) {
    await knex("TodoListResponsibleUserTaskRelation").delete("*").where({
      user_id,
    });
  }
}
