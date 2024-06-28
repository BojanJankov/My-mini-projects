import { UserController } from "../controllers/user.controller.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.patch("/:id", UserController.updateUser);
