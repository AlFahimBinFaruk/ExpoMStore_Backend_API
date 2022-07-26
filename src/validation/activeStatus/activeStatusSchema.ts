import Joi from "joi";

const activeStatusSchema = Joi.object({
  status: Joi.string().required(),
});

export default activeStatusSchema;
