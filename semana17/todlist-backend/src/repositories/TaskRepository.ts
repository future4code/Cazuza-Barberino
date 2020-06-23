import knex from "../database/connection";

export default class TaskRepository {
  public static async getTaskById(id: string) {
    return await knex("TodoListTasks")
      .select(
        "TodoListTasks.*",
        "TodoListUsers.nickname as creatorUserNickname"
      )
      .where("TodoListTasks.id", "=", id)
      .join("TodoListUsers", {
        "TodoListUsers.id": "TodoListTasks.user_creator_id",
      });
  }

  public static async getAllTasks(
    user_creator_id: string,
    status: string,
    search: string
  ) {
    const query = knex("TodoListTasks");

    if (user_creator_id) query.where({ user_creator_id });

    if (status) query.where({ status });

    if (search) query.where("title", "like", `%${search}%`);

    return await query.select("*");
  }

  public static async existTask(id: string) {
    return (
      (await knex("TodoListTasks").count("* as cnt").where({ id }))[0].cnt > 0
    );
  }

  public static async editTaskStatus(id: string, status: string) {
    await knex("TodoListTasks").update({ status }).where({ id });
  }

  public static async addNewTask(newTask: {
    id: string;
    title: string;
    user_creator_id: string;
  }) {
    await knex("TodoListTasks").insert(newTask);
  }

  public static async deleteTask(id: string) {
    await knex("TodoListTasks").delete("*").where({ id });
  }
}
