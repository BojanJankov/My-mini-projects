import { StudentModel } from "../model/students.model.js";

export class StudentController {
  static async getAllStudents(req, res) {
    try {
      const students = await StudentModel.getAllStudents(req.query);

      return res.status(201).json(students);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async createStudent(req, res) {
    try {
      const newStudent = await StudentModel.createStudent(req.body);

      return res.json(newStudent);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }

  static async getStudentById(req, res) {
    try {
      const foundStudent = await StudentModel.getStudentById(req.params.id);

      return res.json(foundStudent);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateStudent(req, res) {
    try {
      await StudentModel.updateStudent(req.params.id, req.body);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  static async deleteStudent(req, res) {
    try {
      await StudentModel.deleteStudent(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async deleteAllStudents(req, res) {
    try {
      await StudentModel.deleteAllStudents();

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
