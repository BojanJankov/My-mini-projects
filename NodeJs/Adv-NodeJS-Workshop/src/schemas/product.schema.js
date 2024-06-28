import Joi from "joi";

export const productJoiSchema = Joi.object({
  title: Joi.string().min(2).required(),
  stock: Joi.number().min(0).required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number().min(0).max(5).required(),
});

export const productJoiUpdateSchema = Joi.object({
  title: Joi.string().min(2),
  stock: Joi.number().min(0),
  description: Joi.string(),
  category: Joi.string(),
  price: Joi.number(),
  rating: Joi.number().min(0).max(5),
});
