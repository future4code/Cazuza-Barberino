import { Router, request, response } from "express";
import createUserService from "../services/userServices/createUserService";
import updateUserService from "../services/userServices/updateUserService";
import deleteUserService from "../services/userServices/deleteUserService";

import UserRepository from "../repositories/UserRepository";

const usersRoutes = Router();

usersRoutes.get("/", async (request, response) => {
  const userList = await UserRepository.getAllUsers();
  response.json(userList);
});

usersRoutes.get("/:id", async (request, response) => {
  const { id } = request.params;

  const user = await UserRepository.getUserById(id);

  response.json(user);
});

usersRoutes.post("/", async (request, response) => {
  const { name, email, nickname, password } = request.body;

  const user = await createUserService({
    name,
    email,
    nickname,
    password,
  });

  response.json(user);
});

usersRoutes.put("/:id", async (request, response) => {
  const { name, email, nickname } = request.body;
  const { id } = request.params;

  await updateUserService({
    name,
    email,
    nickname,
    userId: id,
  });

  response.json({ msg: "User successfully updated" });
});

usersRoutes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  await deleteUserService(id);

  response.json({ msg: "ok" });
});

export default usersRoutes;
