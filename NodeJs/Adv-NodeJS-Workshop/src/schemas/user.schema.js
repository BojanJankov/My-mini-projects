import Joi from "joi";

export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(19).required(),
  email: Joi.string().email().required(),
  country: Joi.string().required(),
  orders: Joi.array().items(Joi.string()),
});

export const userJoiUpdateSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  age: Joi.number().min(19),
  email: Joi.string().email(),
  country: Joi.string(),
  orders: Joi.array().items(Joi.string()),
});
