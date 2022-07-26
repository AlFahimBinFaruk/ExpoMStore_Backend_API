import { RequestHandler } from "express";
import validator from "../../utils/validator";
import editCategorySchema from "./editCategorySchema";

const getEditCategoryDataValidation: RequestHandler = (req, res, next) =>
  validator(editCategorySchema, req.body, next);

export default getEditCategoryDataValidation;
