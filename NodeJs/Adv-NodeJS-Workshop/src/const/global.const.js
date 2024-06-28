import { Router } from "express";
import { productRouter } from "../routes/product.routes.js";
import { orderRouter } from "../routes/order.routes.js";
import { userRouter } from "../routes/user.routes.js";
import { authRouter } from "../routes/auth.routes.js";
import { tokenValidator } from "../middlewares/token-validator.js";

export const globalRouter = Router();

globalRouter.use("/products", tokenValidator, productRouter);
globalRouter.use("/orders", tokenValidator, orderRouter);
globalRouter.use("/users", tokenValidator, userRouter);
globalRouter.use("/clients", authRouter);
