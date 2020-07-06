import { Request, Response } from "express";

export default class UserController {
  public static async create(request: Request, response: Response) {
    const { email, password, name, role } = request.body;

    

    response.json({ msg: "ok" });
  }
}
