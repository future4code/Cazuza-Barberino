import { uuid } from "uuidv4";
import AppError from "../../err";
import TaskRepository from "../../repositories/TaskRepository";

interface Request {
  title: string;
  description: string;
  limit_date: string;
  user_creator_id: string;
}

export default async function createTaskService({
  title,
  user_creator_id,
}: Request) {
  if (!title || title.trim() === "")
    throw new AppError("Invalid or missing title property");

  if (!user_creator_id)
    throw new AppError("Invalid or missing user_creator_id property");

  const newTask = {
    id: uuid(),
    title,
    user_creator_id,
  };

  TaskRepository.addNewTask(newTask);

  return newTask;
}
