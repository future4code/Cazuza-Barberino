import UserRepository from "../../repositories/UserRepository";
import TaskRepository from "../../repositories/TaskRepository";
import ResponsibleRepository from "../../repositories/ResponsibleRepository";
import AppError from "../../err";
import deleteTaskService from "../taskServices/deleteTaskService";

export default async function deleteUserService(id: string) {
  if (!id) throw new AppError("Missing id property");

  if ((await UserRepository.getUserById(id)).length === 0)
    throw new AppError("User does not exist");

  const tasksByUser = await TaskRepository.getAllTasks(id, "", "");

  await Promise.all(
    tasksByUser.map(({ task_id }) => deleteTaskService(task_id))
  );

  await ResponsibleRepository.removeAllResponsibility(id);

  await UserRepository.deleteUser(id);
}
