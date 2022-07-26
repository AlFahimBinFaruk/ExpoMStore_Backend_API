import { RequestHandler } from "express";
import validator from "../../utils/validator";
import signUpSchema from "./signUpSchema";

const getSignUpDataValidation: RequestHandler = (req, res, next) =>
  validator(signUpSchema, req.body, next);

export default getSignUpDataValidation;
