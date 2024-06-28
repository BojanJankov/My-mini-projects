import { Router } from "express";
import { studentRouter } from "../routes/students.router.js";
import { authRouter } from "../routes/auth.router.js";
import { trainerRouter } from "../routes/trainers.router.js";
import { validateToken } from "../middleware/token-validator.middleware.js";

export const globalRouter = Router();

globalRouter.use("/students", validateToken, studentRouter);
globalRouter.use("/trainers", validateToken, trainerRouter);
globalRouter.use("/", authRouter);
