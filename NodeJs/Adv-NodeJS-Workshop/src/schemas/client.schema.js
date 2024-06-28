import Joi from "joi";

export const clientJoiSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  refreshTokens: Joi.array().items(Joi.string()),
});
