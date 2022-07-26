import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Admin from "../../model/admin";
import User from "../../model/user";
import Product from "../../model/product";
import Category from "../../model/category";
import Order from "../../model/order";

export const handleGetSiteOverview: RequestHandler = async (req, res, next) => {
  try {
    //check if reqested user is admin or super admin
    if (req.user.role === "admin" || req.user.role === "super admin") {
      const totalCategory = await Category.count();
      const totalAdmin = await Admin.count();
      const totalUser = await User.count();
      const totalProduct = await Product.count();
      const totalOrder = await Order.count();

      //send res
      res
        .status(200)
        .json({
          totalAdmin,
          totalCategory,
          totalUser,
          totalProduct,
          totalOrder,
        });
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetSiteOverview;
