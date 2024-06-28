import { ProductService } from "../services/product.service.js";
import {
  productJoiSchema,
  productJoiUpdateSchema,
} from "../schemas/product.schema.js";

export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts(req.query);

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getProductById(req, res) {
    try {
      const foundProduct = await ProductService.getProductById(req.params.id);

      return res.status(201).json(foundProduct);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  static async createProduct(req, res) {
    try {
      await productJoiSchema.validateAsync(req.body, { abortEarly: false });

      const newProduct = await ProductService.createProduct(req.body);

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  static async updateProduct(req, res) {
    try {
      await productJoiUpdateSchema.validateAsync(req.body);

      const updatedProdcut = await ProductService.updateProduct(
        req.params.id,
        req.body
      );

      return res.status(201).json(updatedProdcut);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  static async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
}
