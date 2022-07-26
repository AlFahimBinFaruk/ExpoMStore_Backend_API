import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category";

const handleCategoryEdit: RequestHandler = async (req, res, next) => {
  try {
    //id of category i want to update status
    const id = req.params.id;
    //check role of auth user (if he is admin/super admin or not)
    const role = req.user.role;

    //only admin and super admin can update status
    if (role === "admin" || role === "super admin") {
      //see if category exits
      const category = await Category.findById(id);
      //if the account exits and it is not of super admin then we will update status
      if (category) {
        const updatedCat = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        //send updated category details
        res.status(201).json(updatedCat);
      } else {
        return next(createHttpError(400, "You are not Authorized!!"));
      }
    } else {
      return next(createHttpError(400, "You are not Authorized!!"));
    }
  } catch (error) {
    return next(createHttpError(500, "Internal server error"));
  }
};

export default handleCategoryEdit;
