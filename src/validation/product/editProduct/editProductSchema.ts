import Joi from "joi";

const editProductSchema = Joi.object({
  title: Joi.string().min(3).max(60),
  categoryDetails: Joi.object({
    id: Joi.string().min(3).max(60),
    title: Joi.string().min(3).max(60),
    _id: Joi.string().max(60),
  }),
  thumbnail: Joi.string().min(3),
  price: Joi.number().min(3).max(60000),
  description: Joi.string().min(3).max(60),
});

export default editProductSchema;
