import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";

export class UserService {
  static async getAllUsers(filters) {
    const users = await User.find(filters);

    return users;
  }
  static async getUserById(userId) {
    const foundUser = await User.findById(userId).populate({
      path: "orders",
      model: Order,
    });

    if (!foundUser) throw new Error("User Not Found");

    return foundUser;
  }
  static async createUser(userData) {
    const newUser = new User(userData);

    const user = newUser.save();

    return user;
  }
  static async updateUser(userId, userUpdateData) {
    const foundUser = await User.findById(userId);

    Object.assign(foundUser, userUpdateData);

    const updatedUser = await foundUser.save();

    return updatedUser;
  }
}
