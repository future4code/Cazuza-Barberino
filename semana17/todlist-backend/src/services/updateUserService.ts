import knex from "../database/connection";

interface Request {
  name: string;
  nickname: string;
  email: string;
  userId: string;
}

export default async function updateUserService({
  name,
  nickname,
  email,
  userId,
}: Request) {
  if (nickname.trim() === "") throw "Invalid Nickname";
  if (name.trim() === "") throw "Invalid Name";
  if (email.trim() === "") throw "Invalid Email";

  const userExists = await knex("TodoListUsers")
    .count("* as cnt")
    .where(function () {
      this.where({
        nickname,
      }).orWhere({ email });
    })
    .andWhereNot({
      id: userId,
    });

  if (userExists[0].cnt > 0) throw "User already registered";

  const updatedUser = {
    name,
    nickname,
    email,
  };

  await knex("TodoListUsers").update(updatedUser).where({ id: userId });
}
