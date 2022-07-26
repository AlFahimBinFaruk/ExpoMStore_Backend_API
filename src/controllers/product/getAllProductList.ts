import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

export const handleGetAllProductList: RequestHandler = async (
  req,
  res,
  next
) => {
  const { pageNo = 1 }: any = req.query;

  try {
    //check if reqested user is admin or super admin
    if (req.user.role === "admin" || req.user.role === "super admin") {
      //only send 10 data at once.
      const limit = 10;
      //skip data depending on the list we send prev.
      let skip = (pageNo - 1) * limit;
      //find active products
      const activeProductList = await Product.find()
        .select(["title", "thumbnail", "price", "categoryDetails","status"])
        .skip(skip)
        .limit(limit);

      //send total page counst
      const totalPageCount = Math.ceil((await Product.count()) / limit);
      //send res
      res.status(200).json({ productList: activeProductList, totalPageCount });
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetAllProductList;
