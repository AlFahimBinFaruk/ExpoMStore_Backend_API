import Joi from "joi";

const addCategorySchema = Joi.object({
  title: Joi.string().min(3).max(60).required(),
  thumbnail: Joi.string().min(3).required(),
});

export default addCategorySchema;
