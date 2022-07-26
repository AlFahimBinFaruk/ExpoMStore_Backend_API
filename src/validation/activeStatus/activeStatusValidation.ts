import { RequestHandler } from "express";
import validator from "../utils/validator";
import activeStatusSchema from "./activeStatusSchema";

const getActiveStatusDataValidation: RequestHandler = (req, res, next) =>
  validator(activeStatusSchema, req.body, next);

export default getActiveStatusDataValidation;
