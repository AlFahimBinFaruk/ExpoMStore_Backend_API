import { RequestHandler } from "express";
import createHttpError from "http-errors";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY!);
import Order from "../../model/order";
import Product from "../../model/product";

interface ICheckout {
  orderDetails: [
    {
      productId: string;
      qty: number;
    }
  ];
  address: string;
}

export const handleCheckout: RequestHandler = async (req, res, next) => {
  const { orderDetails, address }: ICheckout = req.body;
  try {
    if (req?.user?.id) {
      let details: any = orderDetails.map(async (item) => {
        let itemDetails = await Product.findById(item.productId).select([
          "title",
          "price",
        ]);
        return { itemDetails, qty: item.qty };
      });
      details = await Promise.all(details);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: details.map((item: any) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.itemDetails.title,
              },
              unit_amount: item.itemDetails.price * 100,
            },
            quantity: item.qty,
          };
        }),
        //if the payment is successful we will redierect to this page
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        //if the payment is cancel we will redierect to this page
        cancel_url: `${process.env.CLIENT_URL}/payment-fail`,
      });

      //sava order details to db
      const newOrder = new Order({
        userDetails: {
          userId: req.user.id,
          username: req.user.username,
          email: req.user.email,
        },
        orderDetails,
        total: session.amount_total / 100,
        paymentStatus: "pending",
        orderStatus: "pending",
        paymentDetails: session,
        tranId: session.payment_intent,
        address,
      });
      await newOrder.save();
      res.json({ checkoutURL: session.url });
    } else {
      return next(createHttpError(400, "You are not authorized!!"));
    }
  } catch (error) {
    console.log("error =>", error);
    return next(createHttpError(500, "server error"));
  }
};

export default handleCheckout;
