import { Router } from "express";
import UserController from "../controllers/userController";

const usersRoutes = Router();

usersRoutes.get("/", UserController.index);
usersRoutes.post("/", UserController.create);
usersRoutes.get("/:id", UserController.read);
usersRoutes.put("/:id", UserController.update);
usersRoutes.delete("/:id", UserController.delete);

export default usersRoutes;
