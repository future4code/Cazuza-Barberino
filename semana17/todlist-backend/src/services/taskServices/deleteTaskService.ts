import AppError from "../../err";
import TaskRepository from "../../repositories/TaskRepository";
import ResponsibleRepository from "../../repositories/ResponsibleRepository";

export default async function deleteTaskService(id: string) {
  if (!id) throw new AppError("Missing id property");

  if (!(await TaskRepository.existTask(id)))
    throw new AppError("Task doest not exist");

  await ResponsibleRepository.deleteResponsibleTask(id);

  await TaskRepository.deleteTask(id);
}
