import { RequestHandler } from "express";
import validator from "../../utils/validator";
import addCategorySchema from "./addCategorySchema";

const getAddCategoryDataValidation: RequestHandler = (req, res, next) =>
  validator(addCategorySchema, req.body, next);

export default getAddCategoryDataValidation;
