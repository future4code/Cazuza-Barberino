import ResponsibleRepository from "../../repositories/ResponsibleRepository";
import TaskRepository from "../../repositories/TaskRepository";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../err";

interface Request {
  task_id: string;
  responsible_user_ids: string[];
}

export default async function addResponsibleService({
  task_id,
  responsible_user_ids,
}: Request) {
  const tasks = await TaskRepository.getTaskById(task_id);

  if (tasks.length === 0) throw new AppError("Task does not exist");

  if (!responsible_user_ids || responsible_user_ids.length === 0)
    throw new AppError(
      "Invalid or missing or empty responsible_user_ids property"
    );

  await Promise.all(
    responsible_user_ids.map((user_id) => addResponsible(task_id, user_id))
  );
}

async function addResponsible(task_id: string, user_id: string) {
  if ((await UserRepository.getUserById(user_id)).length === 0)
    throw new AppError("User does not exist");

  const userAlreadyAssigned = await ResponsibleRepository.isUserResponsible(
    task_id,
    user_id
  );

  if (!userAlreadyAssigned)
    await ResponsibleRepository.addResponsible(task_id, user_id);
}
