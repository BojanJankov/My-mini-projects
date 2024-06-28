import { DataService } from "../services/data.service.js";
import { createPath } from "../../path.js";
import Joi from "joi";
import { v4 as uuid } from "uuid";

// Path to data of students(json)
const STUDENTS_PATH = createPath(["data", "students.json"]);
// Student class
class Student {
  id = uuid();
  constructor(firstName, lastName, age, email, academy) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.academy = academy;
  }
}
// Validation with joi
const studentSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  age: Joi.number().min(14).max(77).required(),
  email: Joi.string().email().required(),
  academy: Joi.string().min(2).max(30).required(),
});

export class StudentModel {
  static async saveStudents(students) {
    await DataService.saveJSONFile(STUDENTS_PATH, students);
  }

  static async getAllStudents(filters) {
    let students = await DataService.readJSONFile(STUDENTS_PATH);

    if (filters?.sortBy) {
      if (filters.sortBy === "age")
        return students.sort((a, b) => a.age - b.age);

      return students;
    }
  }

  static async createStudent(studentData) {
    const students = await this.getAllStudents();

    const studentExists = students.some(
      (student) => student.email === studentData.email
    );

    if (studentExists) throw new Error("Email already exists");

    const validation = studentSchema.validate(studentData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const { firstName, lastName, age, email, academy } = studentData;

    const newStudent = new Student(firstName, lastName, age, email, academy);

    const updatedStudents = [...students, newStudent];

    await this.saveStudents(updatedStudents);

    return newStudent;
  }

  static async getStudentById(studentId) {
    const students = await this.getAllStudents();

    const foundStudent = students.find((student) => student.id === studentId);

    if (!foundStudent) throw new Error("Student not found");

    return foundStudent;
  }

  static async updateStudent(studentId, studentData) {
    if (studentData.id)
      throw new Error("Can't update student! Invalid request");

    const students = await this.getAllStudents();

    const foundStudent = students.some((student) => student.id === studentId);

    if (!foundStudent) throw new Error("Student not found");

    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, ...studentData };
      } else {
        return student;
      }
    });

    await this.saveStudents(updatedStudents);
  }

  static async deleteStudent(studentId) {
    const students = await this.getAllStudents();

    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );

    if (updatedStudents.length === students.length)
      throw new Error("Student not found");

    await this.saveStudents(updatedStudents);
  }

  static async deleteAllStudents() {
    await this.saveStudents([]);
  }
}
