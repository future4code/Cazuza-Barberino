import { Request, Response } from "express";
import TaskRepository from "../repositories/TaskRepository";
import ResponsibleRepository from "../repositories/ResponsibleRepository";
import addResponsibleService from "../services/responsibleServices/addResponsibleServices";
import removeResponsibleService from "../services/responsibleServices/removeResponsibleService";
import AppError from "../err";

export default class ResponsibleController {
  public static async create(request: Request, response: Response) {
    const { task_id, responsible_user_ids } = request.body;

    await addResponsibleService({ task_id, responsible_user_ids });

    response.json({ msg: "Responsible added successfully" });
  }

  public static async read(request: Request, response: Response) {
    const { id } = request.params;

    const searchResult = await TaskRepository.existTask(id);
    if (!searchResult) throw new AppError("Task does not exist");

    const responsibles = await ResponsibleRepository.getResponsibles(id);

    response.json({ responsibles });
  }

  public static async delete(request: Request, response: Response) {
    const { id, user_id } = request.params;

    await removeResponsibleService({ task_id: id, user_id });

    response.json({ msg: "ok" });
  }
}
