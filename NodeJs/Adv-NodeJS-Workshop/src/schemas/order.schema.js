import Joi from "joi";

export const orderJoiSchema = Joi.object({
  date: Joi.string().required(),
  user: Joi.string().required(),
  products: Joi.array().items(Joi.string()),
});

export const orderJoiUpdateSchema = Joi.object({
  date: Joi.string(),
  user: Joi.string(),
  products: Joi.array().items(Joi.string()),
});
