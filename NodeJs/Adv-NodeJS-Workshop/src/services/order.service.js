import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export class OrderService {
  static async getAllOrders() {
    const orders = await Order.find({});

    return orders;
  }
  static async getOrderById(orderId) {
    const foundOrder = await Order.findById(orderId)
      .populate({
        path: "user",
        model: User,
      })
      .populate({
        path: "products",
        model: Product,
      });

    if (!foundOrder) throw new Error("Order Not Found");

    return foundOrder;
  }
  static async createOrder(orderData) {
    const newOrder = new Order(orderData);

    const foundUser = await User.findById(newOrder.user);

    if (!foundUser) throw new Error("User Not Found");

    foundUser.orders.push(newOrder._id);

    console.log(newOrder._id);

    foundUser.save();

    const order = await newOrder.save();

    return order;
  }
  static async updateOrder(orderId, orderUpdateData) {
    const foundOrder = await Order.findById(orderId);

    Object.assign(foundOrder, orderUpdateData);

    const updatedOrder = await foundOrder.save();

    return updatedOrder;
  }
  static async deleteOrder(orderId) {
    const response = await Order.findByIdAndDelete(orderId);

    if (!response) throw new Error("Order Not Found");
  }
}
