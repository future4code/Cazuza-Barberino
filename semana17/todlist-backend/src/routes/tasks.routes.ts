import { Router } from "express";
import TaskController from "../controllers/taskController";
import ResponsibleController from "../controllers/responsibleController";

const taskRoutes = Router();

taskRoutes.get("/", TaskController.index);
taskRoutes.post("/", TaskController.create);
taskRoutes.get("/:id", TaskController.read);
taskRoutes.put("/status/edit", TaskController.update);
taskRoutes.delete("/:id", TaskController.delete);

taskRoutes.post("/responsible", ResponsibleController.create);
taskRoutes.get("/:id/responsible", ResponsibleController.read);
taskRoutes.delete("/:id/responsible/:user_id", ResponsibleController.delete);

export default taskRoutes;
