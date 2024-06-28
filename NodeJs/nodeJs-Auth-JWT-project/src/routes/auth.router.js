import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);
authRouter.get("/logout", AuthController.logoutUser);
authRouter.get("/refresh-access", AuthController.refreshAccessToken);
authRouter.get("/logout-all", AuthController.logoutAll);
