import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category";

interface IAddCategory {
  title: string;
  thumbnail: string;
}

export const handleAddNewCategory: RequestHandler = async (req, res, next) => {
  const { title, thumbnail }: IAddCategory = req.body;

  try {
    if (req.user.role === "admin" || req.user.role === "super admin") {
      const category = await Category.findOne({ title });

      if (category) {
        return next(createHttpError(406, "Category already exists!!"));
      } else {
        const newCategory = new Category({
          title,
          thumbnail,
          status: "active",
        });

        await newCategory.save();
        res.status(200).json(newCategory);
      }
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleAddNewCategory;
