import knex from "../database/connection";
import { uuid } from "uuidv4";

interface Request {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

export default async function createUserService({
  nickname,
  password,
  email,
  name,
}: Request): Promise<{
  id: string;
  nickname: string;
  password: string;
}> {
  if (nickname.trim() === "") throw "Invalid Nickname";
  if (password.trim() === "") throw "Invalid Password";
  if (name.trim() === "") throw "Invalid Name";
  if (email.trim() === "") throw "Invalid Email";

  const userExists = await knex("TodoListUsers")
    .count("* as cnt")
    .where({
      nickname,
    })
    .orWhere({
      email,
    });

  if (userExists[0].cnt > 0) throw "User already registered";

  const newUser = {
    id: uuid(),
    nickname,
    password,
    email,
    name,
  };

  await knex("TodoListUsers").insert(newUser);

  delete newUser.password;

  return newUser;
}
