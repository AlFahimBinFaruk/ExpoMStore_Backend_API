import Joi from "joi";

const editCategorySchema = Joi.object({
  title: Joi.string().min(3).max(60),
  thumbnail: Joi.string().min(3),
});

export default editCategorySchema;
