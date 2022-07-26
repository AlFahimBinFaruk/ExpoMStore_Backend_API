import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Order from "../../model/order";

interface IActiveStatus {
  status: string;
}

const handleOrderStatus: RequestHandler = async (req, res, next) => {
  const { status }: IActiveStatus = req.body;
  try {
    //id of order i want to update status
    let id = req.params.id;
    //check role of auth user (if he is admin/super admin or not)
    const role = req.user.role;

    //only admin and super admin can update status
    if (role === "admin" || role === "super admin") {
      //see if order exits
      const order = await Order.findById(id);

      if (order) {
        const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { orderStatus: status },
          { new: true }
        );
        //send updated order details
        res.status(201).json(updatedOrder);
      } else {
        return next(createHttpError(400, "You are not Authorized!!"));
      }
    } else {
      return next(createHttpError(400, "You are not Authorized!!"));
    }
  } catch (error) {
    return next(createHttpError(500, "Internal server error"));
  }
};

export default handleOrderStatus;
