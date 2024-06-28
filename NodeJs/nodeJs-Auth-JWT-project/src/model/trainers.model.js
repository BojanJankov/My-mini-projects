import { DataService } from "../services/data.service.js";
import { createPath } from "../../path.js";
import Joi from "joi";
import { v4 as uuid } from "uuid";

const TRAINERS_PATH = createPath(["data", "trainers.json"]);

class Trainer {
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
const trainerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  age: Joi.number().min(18).max(77).required(),
  email: Joi.string().email().required(),
  academy: Joi.string().min(2).max(30).required(),
});

export class TrainerModel {
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(TRAINERS_PATH, trainers);
  }

  static async getAllTrainers(filters) {
    let trainers = await DataService.readJSONFile(TRAINERS_PATH);

    if (filters?.sortBy) {
      if (filters.sortBy === "age")
        return trainers.sort((a, b) => a.age - b.age);

      return trainers;
    }

    return trainers;
  }

  static async createTrainer(trainerData) {
    const trainers = await this.getAllTrainers();

    const emailExists = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExists) throw new Error("Email already exists");

    const validation = trainerSchema.validate(trainerData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const { firstName, lastName, age, email, academy } = trainerData;

    const newTrainer = new Trainer(firstName, lastName, age, email, academy);

    const updatedTrainers = [...trainers, newTrainer];

    await this.saveTrainers(updatedTrainers);

    return newTrainer;
  }

  static async getTrainerById(trainerId) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Trainer not found");

    return foundTrainer;
  }

  static async updateTrainer(trainerId, trainerData) {
    if (trainerData.id) throw new Error("Can't update trainer id");

    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.some((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Trainer not found");

    const updatedTrainers = trainers.map((trainer) => {
      if (trainer.id === trainerId) {
        return { ...trainer, ...trainerData };
      } else {
        return trainer;
      }
    });

    await this.saveTrainers(updatedTrainers);
  }

  static async deleteTrainer(trainerId) {
    const trainers = await this.getAllTrainers();

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (trainers.length === updatedTrainers.length)
      throw new Error("Can't find trainer");

    await this.saveTrainers(updatedTrainers);
  }
}
