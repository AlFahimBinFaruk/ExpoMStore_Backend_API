import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category";

export const handleGetActiveCategoryList: RequestHandler = async (
  req,
  res,
  next
) => {
  const { pageNo = 1 }: any = req.query;

  try {
    //only send 10 data at once.
    const limit = 10;
    //skip data depending on the list we send prev.
    let skip = (pageNo - 1) * limit;
    //find active category
    const activeCategoryList = await Category.find({ status: "active" })
      .skip(skip)
      .limit(limit);

    //send total page counst
    const totalPageCount = Math.ceil((await Category.count()) / limit);
    //send res
    res.status(200).json({ categoryList: activeCategoryList, totalPageCount });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetActiveCategoryList;
