import { RequestHandler } from "express";
import validator from "../../utils/validator";
import loginSchema from "./loginSchema";

const getLoginDataValidation: RequestHandler = (req, res, next) =>
  validator(loginSchema, req.body, next);

export default getLoginDataValidation;
