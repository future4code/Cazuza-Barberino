import { Router } from "express";
import usersRoutes from "./users.routes";
import tasksRoutes from "./tasks.routes";

const routes = Router();

routes.use("/user", usersRoutes);
routes.use("/task", tasksRoutes);

export default routes;
