import { Router, request, response } from "express";
import TaskRepository from "../repositories/TaskRepository";
import ResponsibleRepository from "../repositories/ResponsibleRepository";
import createTaskService from "../services/taskServices/createTaskService";
import addResponsibleService from "../services/responsibleServices/addResponsibleServices";
import removeResponsibleService from "../services/responsibleServices/removeResponsibleService";
import editTaskStatusService from "../services/taskServices/editTaskStatusService";
import deleteTaskService from "../services/taskServices/deleteTaskService";

import AppError from "../err";

const taskRoutes = Router();

taskRoutes.get("/", async (request, response) => {
  const { creatorUserId, status, search } = request.query;

  const taskList = await TaskRepository.getAllTasks(
    creatorUserId as string,
    status as string,
    search as string
  );

  response.json({ taskList });
});

taskRoutes.get("/:id", async (request, response) => {
  const { id } = request.params;

  const searchResult = await TaskRepository.getTaskById(id);
  if (searchResult.length === 0) throw new AppError("Task does not exist");

  const task = searchResult[0];

  const responsibles = await ResponsibleRepository.getResponsibles(id);

  task["responsibleUsers"] = responsibles;

  response.json({ task });
});

taskRoutes.post("/", async (request, response) => {
  const { title, description, limit_date, user_creator_id } = request.body;

  const newTask = await createTaskService({
    title,
    description,
    limit_date,
    user_creator_id,
  });
  response.json({ newTask });
});

taskRoutes.post("/status/edit", async (request, response) => {
  const { task_ids, status } = request.body;

  await editTaskStatusService({ task_ids, status });

  response.json({ msg: "Task status successfully updated" });
});

taskRoutes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  await deleteTaskService(id);

  response.json({ msg: "Task deleted successfully" });
});

// Responsible

taskRoutes.post("/responsible", async (request, response) => {
  const { task_id, responsible_user_ids } = request.body;

  await addResponsibleService({ task_id, responsible_user_ids });

  response.json({ msg: "Responsible added successfully" });
});

taskRoutes.get("/:id/responsible", async (request, response) => {
  const { id } = request.params;

  const searchResult = await TaskRepository.existTask(id);
  if (!searchResult) throw new AppError("Task does not exist");

  const responsibles = await ResponsibleRepository.getResponsibles(id);

  response.json({ responsibles });
});

taskRoutes.delete("/:id/responsible/:user_id", async (request, response) => {
  const { id, user_id } = request.params;

  await removeResponsibleService({ task_id: id, user_id });

  response.json({ msg: "ok" });
});

export default taskRoutes;
