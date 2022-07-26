import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Order from "../../model/order";

export const handleGetMyOrderHistory: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    if (req.user.id) {
      //find my order list
      const myOrderyList = await Order.find({
        "userDetails.userId": req.user.id,
      });
      //send res
      res.status(200).json(myOrderyList);
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetMyOrderHistory;
