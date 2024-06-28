import { Router } from "express";
import { TrainerController } from "../controller/trainers.controller.js";

export const trainerRouter = Router();

trainerRouter.get("/", TrainerController.getAllTrainers);
trainerRouter.post("/", TrainerController.createTrainer);
trainerRouter.get("/:id", TrainerController.getTrainerById);
trainerRouter.patch("/:id", TrainerController.updateTrainer);
trainerRouter.delete("/:id", TrainerController.deleteTrainer);
