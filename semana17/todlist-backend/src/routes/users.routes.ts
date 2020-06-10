import { Router } from "express";
import knex from "../database/connection";
import createUserService from "../services/createUserService";
import updateUserService from "../services/updateUserService";

const usersRoutes = Router();

usersRoutes.get("/", async (request, response) => {
  const userList = await knex("TodoListUsers").select("id", "name");

  response.json(userList);
});

usersRoutes.get("/:id", async (request, response) => {
  const { id } = request.params;

  const user = await knex("TodoListUsers")
    .select("id", "name", "nickname", "email")
    .where({
      id,
    });

  if (user.length) response.json(user[0]);
  else response.status(400).json("no user found");
});

usersRoutes.post("/", async (request, response) => {
  const { name, email, nickname, password } = request.body;

  try {
    const user = await createUserService({
      name,
      email,
      nickname,
      password,
    });

    response.json(user);
  } catch (err) {
    response.status(400).json({ msg: err });
  }
});

usersRoutes.put("/:id", async (request, response) => {
  const { name, email, nickname } = request.body;
  const { id } = request.params;

  try {
    await updateUserService({
      name,
      email,
      nickname,
      userId: id,
    });

    response.json({ msg: "User successfully updated" });
  } catch (err) {
    response.status(400).json({ msg: err });
  }
});

export default usersRoutes;
