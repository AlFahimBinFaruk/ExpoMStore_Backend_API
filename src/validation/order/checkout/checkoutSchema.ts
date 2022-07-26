import Joi from "joi";

const checkoutSchema = Joi.object({
  orderDetails: Joi.array()
    .items({
      productId: Joi.string().min(3).max(60).required(),
      qty: Joi.number().min(1).required(),
    })
    .required(),
  address: Joi.string().min(3).required(),
});
export default checkoutSchema;
