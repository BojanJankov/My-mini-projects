import { OrderService } from "../services/order.service.js";
import {
  orderJoiSchema,
  orderJoiUpdateSchema,
} from "../schemas/order.schema.js";
export class OrderController {
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();

      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getOrderById(req, res) {
    try {
      const foundOrder = await OrderService.getOrderById(req.params.id);

      return res.status(201).json(foundOrder);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  static async createOrder(req, res) {
    try {
      await orderJoiSchema.validateAsync(req.body, { abortEarly: false });

      const newOrder = await OrderService.createOrder(req.body);

      return res.json(newOrder);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  static async updateOrder(req, res) {
    try {
      await orderJoiUpdateSchema.validateAsync(req.body);

      const updatedOrder = await OrderService.updateOrder(
        req.params.id,
        req.body
      );

      return res.json(updatedOrder);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  static async deleteOrder(req, res) {
    try {
      await OrderService.deleteOrder(req.params.id);
      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
}
