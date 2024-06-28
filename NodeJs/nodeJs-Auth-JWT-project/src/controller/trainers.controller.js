import { TrainerModel } from "../model/trainers.model.js";

export class TrainerController {
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerModel.getAllTrainers(req.query);

      return res.status(201).json(trainers);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async createTrainer(req, res) {
    try {
      const newTrainer = await TrainerModel.createTrainer(req.body);

      return res.status(201).json(newTrainer);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async getTrainerById(req, res) {
    try {
      const foundTrainer = await TrainerModel.getTrainerById(req.params.id);

      return res.status(201).json(foundTrainer);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateTrainer(req, res) {
    try {
      await TrainerModel.updateTrainer(req.params.id, req.body);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async deleteTrainer(req, res) {
    try {
      await TrainerModel.deleteTrainer(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
