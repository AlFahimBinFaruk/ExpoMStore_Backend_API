import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

interface IActiveStatus {
  status: string;
}

const handleProductActiveStatus: RequestHandler = async (req, res, next) => {
  const { status }: IActiveStatus = req.body;
  try {
    //id of product i want to update status
    let id = req.params.id;
    //check role of auth user (if he is admin/super admin or not)
    const role = req.user.role;

    //only admin and super admin can update status
    if (role === "admin" || role === "super admin") {
      //see if product exits
      const product = await Product.findById(id);

      if (product) {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        //send updated product details
        res.status(201).json(updatedProduct);
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

export default handleProductActiveStatus;
