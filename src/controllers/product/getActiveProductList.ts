import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

export const handleGetActiveProductList: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { pageNo = 1, categoryId }:any = req.query;
    //only send 10 data at once.
    const limit = 10;
    //skip data depending on the list we send prev.
    let skip = (pageNo - 1) * limit;
    //find active products
    let activeProductList;
    if (categoryId) {
      activeProductList = await Product.find({
        status: "active",
        "categoryDetails.id": categoryId,
      })
        .select(["title", "thumbnail", "price"])
        .skip(skip)
        .limit(limit);
    } else {
      activeProductList = await Product.find({ status: "active" })
        .select(["title", "thumbnail", "price"])
        .skip(skip)
        .limit(limit);
    }

    //send total page counst
    const totalPageCount = Math.ceil((await Product.count()) / limit);
    //send res
    res
      .status(200)
      .json({ productList: activeProductList, totalPageCount });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetActiveProductList;
