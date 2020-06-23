import knex from "../database/connection";

export default class UserRepository {
  public static async getAllUsers() {
    return await knex("TodoListUsers").select(
      "id",
      "name",
      "nickname",
      "email"
    );
  }

  public static async getUserById(id: string) {
    return await knex("TodoListUsers")
      .select("id", "name", "nickname", "email")
      .where({
        id,
      });
  }

  public static async userExists(
    nickname: string,
    email: string,
    ignoreId: string | undefined = undefined
  ) {
    const query = knex("TodoListUsers").where(function () {
      this.where({
        nickname,
      }).orWhere({
        email,
      });
    });
    if (ignoreId) query.andWhereNot({ id: ignoreId });
    const result = await query.count("* as cnt");
    return result[0].cnt > 0;
  }

  public static async countUserWithData(data: object, ignoreId: string) {
    return (
      await knex("TodoListUsers")
        .where(data)
        .andWhereNot({ id: ignoreId })
        .count("* as cnt")
    )[0].cnt;
  }

  public static async addNewUser(newUser: {
    id: string;
    nickname: string;
    password: string;
    email: string;
    name: string;
  }) {
    await knex("TodoListUsers").insert(newUser);
  }

  public static async updateUserData(
    updatedUser: {
      [key: string]: string;
    },
    id: string
  ) {
    await knex("TodoListUsers").update(updatedUser).where({ id });
  }

  public static async deleteUser(id: string) {
    await knex("TodoListUsers").delete("*").where({ id });
  }
}
