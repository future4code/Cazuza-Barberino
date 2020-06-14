import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import createUserService from "../services/userServices/createUserService";
import updateUserService from "../services/userServices/updateUserService";
import deleteUserService from "../services/userServices/deleteUserService";

export default class UserController {
  public static async index(request: Request, response: Response) {
    const userList = await UserRepository.getAllUsers();
    response.json(userList);
  }

  public static async create(request: Request, response: Response) {
    const { name, email, nickname, password } = request.body;

    const user = await createUserService({
      name,
      email,
      nickname,
      password,
    });

    response.json(user);
  }

  public static async read(request: Request, response: Response) {
    const { id } = request.params;

    const user = await UserRepository.getUserById(id);

    response.json(user);
  }

  public static async update(request: Request, response: Response) {
    const { name, email, nickname, password } = request.body;
    const { id } = request.params;

    await updateUserService(id, {
      name,
      email,
      nickname,
      password,
    });

    response.json({ msg: "User successfully updated" });
  }

  public static async delete(request: Request, response: Response) {
    const { id } = request.params;

    await deleteUserService(id);

    response.json({ msg: "ok" });
  }
}
