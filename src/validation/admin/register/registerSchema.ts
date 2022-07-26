import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(60).required(),
  email: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  password: Joi.string().min(6).max(30).required(),
  role: Joi.string().min(3).max(30).required(),
});

export default registerSchema;
