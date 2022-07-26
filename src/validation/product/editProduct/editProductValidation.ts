import { RequestHandler } from "express";
import validator from "../../utils/validator";
import editProductSchema from "./editProductSchema";

const getEditProductDataValidation: RequestHandler = (req, res, next) =>
  validator(editProductSchema, req.body, next);

export default getEditProductDataValidation;
