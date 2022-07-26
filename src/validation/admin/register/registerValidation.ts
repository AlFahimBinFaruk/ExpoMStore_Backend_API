import { RequestHandler } from "express";
import validator from "../../utils/validator";
import registerSchema from "./registerSchema";

const getRegisterDataValidation: RequestHandler = (req, res, next) =>
  validator(registerSchema, req.body, next);
export default getRegisterDataValidation