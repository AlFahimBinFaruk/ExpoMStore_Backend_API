import Joi from "joi";

const addNewProductSchema = Joi.object({
  title: Joi.string().min(3).max(60).required(),
  categoryId: Joi.string().min(3).max(60).required(),
  categoryTitle: Joi.string().min(3).max(60).required(),
  thumbnail: Joi.string().min(3).required(),
  price: Joi.number().min(3).max(60000).required(),
  description: Joi.string().min(3).max(60).required(),
});

export default addNewProductSchema;
