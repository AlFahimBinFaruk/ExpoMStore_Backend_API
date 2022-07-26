import Joi from "joi";

const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(60).required(),
  email: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});

export default signUpSchema;
