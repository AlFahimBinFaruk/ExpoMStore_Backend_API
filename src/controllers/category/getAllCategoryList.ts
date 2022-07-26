import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category";

export const handleGetAllCategoryList: RequestHandler = async (
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
      //find all category
      const allCategoryList = await Category.find().skip(skip).limit(limit);
      //send total page counst
      const totalPageCount = Math.ceil((await Category.count()) / limit);
      //send res
      res.status(200).json({ categoryList: allCategoryList, totalPageCount });
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetAllCategoryList;
