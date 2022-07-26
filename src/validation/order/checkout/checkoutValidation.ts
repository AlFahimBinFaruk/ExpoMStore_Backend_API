import { RequestHandler } from "express";
import validator from "../../utils/validator";
import checkoutSchema from "./checkoutSchema";

const getCheckoutDataValidation: RequestHandler = (req, res, next) =>
  validator(checkoutSchema, req.body, next);

export default getCheckoutDataValidation;
