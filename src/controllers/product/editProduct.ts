import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

const handleEditProduct: RequestHandler = async (req, res, next) => {
  try {
    //id of category i want to update status
    const id = req.params.id;
    //check role of auth user (if he is admin/super admin or not)
    const role = req.user.role;

    //only admin and super admin can update status
    if (role === "admin" || role === "super admin") {
      //see if product exits
      const product = await Product.findById(id);
      //if the account exits and it is not of super admin then we will update
      if (product) {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
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

export default handleEditProduct;
