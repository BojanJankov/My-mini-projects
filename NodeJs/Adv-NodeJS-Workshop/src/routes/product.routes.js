import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/:id", ProductController.getProductById);
productRouter.post("/", ProductController.createProduct);
productRouter.patch("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);
