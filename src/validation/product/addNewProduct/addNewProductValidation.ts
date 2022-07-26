import { RequestHandler } from "express";
import validator from "../../utils/validator";
import addNewProductSchema from "./addNewProductSchema";

const getAddNewProductDataValidation: RequestHandler = (req, res, next) =>
  validator(addNewProductSchema, req.body, next);

export default getAddNewProductDataValidation;
