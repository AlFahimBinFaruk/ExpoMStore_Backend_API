import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category";

export const handleGetCategoryDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    //check if reqested user is admin or super admin
    if (req.user.role === "admin" || req.user.role === "super admin") {
      //find  category details
      const categoryDetails = await Category.findById(id);
      res.status(200).json(categoryDetails);
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetCategoryDetails;
