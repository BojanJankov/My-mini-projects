import { Router } from "express";
import { ClientController } from "../controllers/auth.controller.js";
import { tokenValidator } from "../middlewares/token-validator.js";

export const authRouter = Router();

authRouter.get("/", tokenValidator, ClientController.getAllClients);
authRouter.post("/register", ClientController.registerClient);
authRouter.post("/login", ClientController.loginClient);
authRouter.get("/access-token", ClientController.refreshAccessToken);
authRouter.get("/logout", ClientController.logOutClient);
