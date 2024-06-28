import { userJoiSchema, userJoiUpdateSchema } from "../schemas/user.schema.js";
import { UserService } from "../services/user.service.js";

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers(req.query);

      return res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getUserById(req, res) {
    try {
      const foundUser = await UserService.getUserById(req.params.id);

      return res.status(201).json(foundUser);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      await userJoiSchema.validateAsync(req.body, { abortEarly: false });

      const newUser = await UserService.createUser(req.body);

      return res.json(newUser);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  static async updateUser(req, res) {
    try {
      await userJoiUpdateSchema.validateAsync(req.body);

      const updatedUser = await UserService.updateUser(req.params.id, req.body);

      return res.json(updatedUser);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
}
