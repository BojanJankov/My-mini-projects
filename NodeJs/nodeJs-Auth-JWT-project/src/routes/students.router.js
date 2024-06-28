import { Router } from "express";
import { StudentController } from "../controller/students.controller.js";

export const studentRouter = Router();

studentRouter.get("/", StudentController.getAllStudents);
studentRouter.post("/", StudentController.createStudent);
studentRouter.get("/:id", StudentController.getStudentById);
studentRouter.patch("/:id", StudentController.updateStudent);
studentRouter.delete("/:id", StudentController.deleteStudent);
studentRouter.delete("/", StudentController.deleteAllStudents);
