import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

export const handleGetProductDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  const { id }: any = req.params;

  try {
    const productDetails = await Product.findById(id);
    if (productDetails) {
      res.status(200).json(productDetails);
    } else {
      return next(createHttpError(400, "provide a valid id!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetProductDetails;
