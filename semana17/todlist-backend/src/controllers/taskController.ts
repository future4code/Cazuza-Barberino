import { Request, Response } from "express";
import ResponsibleRepository from "../repositories/ResponsibleRepository";
import TaskRepository from "../repositories/TaskRepository";
import createTaskService from "../services/taskServices/createTaskService";
import deleteTaskService from "../services/taskServices/deleteTaskService";
import editTaskStatusService from "../services/taskServices/editTaskStatusService";
import AppError from "../err";

export default class TaskController {
  public static async index(request: Request, response: Response) {
    const { creatorUserId, status, search } = request.query;

    const taskList = await TaskRepository.getAllTasks(
      creatorUserId as string,
      status as string,
      search as string
    );

    response.json({ taskList });
  }

  public static async create(request: Request, response: Response) {
    const { title, description, limit_date, user_creator_id } = request.body;

    const newTask = await createTaskService({
      title,
      description,
      limit_date,
      user_creator_id,
    });
    response.json({ newTask });
  }

  public static async read(request: Request, response: Response) {
    const { id } = request.params;

    const searchResult = await TaskRepository.getTaskById(id);
    if (searchResult.length === 0) throw new AppError("Task does not exist");

    const task = searchResult[0];

    const responsibles = await ResponsibleRepository.getResponsibles(id);

    task["responsibleUsers"] = responsibles;

    response.json({ task });
  }

  public static async update(request: Request, response: Response) {
    const { task_ids, status } = request.body;

    await editTaskStatusService({ task_ids, status });

    response.json({ msg: "Task status successfully updated" });
  }

  public static async delete(request: Request, response: Response) {
    const { id } = request.params;

    await deleteTaskService(id);

    response.json({ msg: "Task deleted successfully" });
  }
}
