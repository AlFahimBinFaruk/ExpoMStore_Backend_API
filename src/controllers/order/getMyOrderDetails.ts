import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Order from "../../model/order";

export const handleGetMyOrderDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    if (req.user.id) {
      //find my order details
      const myOrderyDetails = await Order.findById(id);
      if (myOrderyDetails?.userDetails?.userId === req.user.id) {
        //send res
        res.status(200).json(myOrderyDetails);
      } else {
        return next(createHttpError(400, "You are not authorized!!"));
      }
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetMyOrderDetails;
