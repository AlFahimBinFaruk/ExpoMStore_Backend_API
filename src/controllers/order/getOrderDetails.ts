import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Order from "../../model/order";

export const handleGetOrderDetails: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    //check if reqested user is admin or super admin
    if (req.user.role === "admin" || req.user.role === "super admin") {
      //find order details
      const orderDetails = await Order.findById(id);
      //send res
      res.status(200).json(orderDetails);
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetOrderDetails;
