import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

export const handleDeleteProduct: RequestHandler = async (req, res, next) => {
  const { id }: any = req.params;

  try {
    if (req.user.role === "admin" || req.user.role === "super admin") {
      const product = await Product.findById(id);
      if (product) {
        await Product.findByIdAndDelete(id);
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

export default handleDeleteProduct;
