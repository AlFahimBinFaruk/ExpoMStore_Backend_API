import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Order from "../../model/order";
import handleSendMail from "../../utils/sendMail";

export const handleStripeWebhook: RequestHandler = async (req, res, next) => {
  try {
    const event = req.body;
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        //console.log("PaymentIntent was successful!", paymentIntent);
        const updatedOrder=await Order.findOneAndUpdate(
          { tranId: paymentIntent.id },
          { paymentDetails: paymentIntent, paymentStatus: paymentIntent.status },{
            new:true
          }
        );
        handleSendMail(updatedOrder)
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        //console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    return next(createHttpError(500, "Internal server error!"));
  }
};

export default handleStripeWebhook;
