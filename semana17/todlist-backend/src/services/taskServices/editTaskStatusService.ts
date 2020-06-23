import TaskRepository from "../../repositories/TaskRepository";
import AppError from "../../err";

interface Request {
  task_ids: string[];
  status: string;
}

export default async function editTaskStatusService({
  task_ids,
  status,
}: Request) {
  if (!task_ids || task_ids.length === 0)
    throw new AppError("Invalid or missing or empty task_ids property");

  if (
    (status !== null && !status) ||
    (status !== null && status !== "done" && status !== "pending")
  )
    throw new AppError("Invalid or missing status property");

  await Promise.all(task_ids.map((id) => editStatus(id, status)));
}

async function editStatus(id: string, status: string) {
  if (!(await TaskRepository.existTask(id)))
    throw new AppError("Task does not exist");
  await TaskRepository.editTaskStatus(id, status);
}
