import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Product from "../../model/product";

interface IAddProduct {
  title: string;
  categoryId: string;
  categoryTitle: string;
  thumbnail: string;
  price: number;
  description: string;
}

export const handleAddNewProduct: RequestHandler = async (req, res, next) => {
  const {
    title,
    categoryId,
    categoryTitle,
    thumbnail,
    price,
    description,
  }: IAddProduct = req.body;

  try {
    if (req.user.role === "admin" || req.user.role === "super admin") {
      const product = await Product.findOne({ title });

      if (product) {
        return next(createHttpError(406, "Product already exists!!"));
      } else {
        const newProduct = new Product({
          title,
          categoryDetails: {
            id: categoryId,
            title: categoryTitle,
          },
          thumbnail,
          price,
          description,
          status: "active",
        });

        await newProduct.save();
        res.status(200).json(newProduct);
      }
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleAddNewProduct;
