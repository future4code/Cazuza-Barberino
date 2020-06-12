import TaskRepository from "../../repositories/TaskRepository";
import UserRepository from "../../repositories/UserRepository";
import ResponsibleRepository from "../../repositories/ResponsibleRepository";
import AppError from "../../err";

interface Request {
  task_id: string;
  user_id: string;
}

export default async function removeResponsibleService({
  task_id,
  user_id,
}: Request) {
  if (!(await TaskRepository.existTask(task_id)))
    throw new AppError("Task does not exist");

  if ((await UserRepository.getUserById(user_id)).length === 0)
    throw new AppError("User does not exist");

  if (!(await ResponsibleRepository.isUserResponsible(task_id, user_id)))
    throw new AppError("This user isnt responsible for this task");

  await ResponsibleRepository.removeResponsible(task_id, user_id);
}
