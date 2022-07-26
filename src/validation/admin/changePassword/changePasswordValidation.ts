import { RequestHandler } from "express";
import validator from "../../utils/validator";
import changePasswordSchema from "./changePasswordSchema";

const getChangePasswordDataValidation: RequestHandler = (req, res, next) =>
  validator(changePasswordSchema, req.body, next);

export default getChangePasswordDataValidation;
