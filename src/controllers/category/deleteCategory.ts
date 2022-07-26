import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category";

export const handleDeleteCategory: RequestHandler = async (req, res, next) => {
  const { id }: any = req.params;

  try {
    if (req.user.role === "admin" || req.user.role === "super admin") {
      const category = await Category.findById(id);
      if (category) {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ msg: "deleted successfully", id });
      } else {
        return next(createHttpError(400, "Provide valid id!!"));
      }
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleDeleteCategory;
