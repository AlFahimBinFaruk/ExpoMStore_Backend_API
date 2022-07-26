import { Router } from "express";
//controllers
import handleCheckout from "../controllers/order/handleCheckout";
import handleGetMyOrderDetails from "../controllers/order/getMyOrderDetails";
import handleGetMyOrderHistory from "../controllers/order/getMyOrderHistory";
import handleGetOrderDetails from "../controllers/order/getOrderDetails";
import handleGetOrderHistory from "../controllers/order/getOrderHistory";
import handleOrderStatus from "../controllers/order/manageOrderStatus";
//auth middlewares
import authenticateUser from "../middleware/authenticateUser";
import authenticateAdmin from "../middleware/authenticateAdmin";
//validations
import getCheckoutDataValidation from "../validation/order/checkout/checkoutValidation";
import getActiveStatusDataValidation from "../validation/activeStatus/activeStatusValidation";
//routes
const router = Router();

/**
 * handle checkout and add new order
 * registerd used can access thsi
 * method POST
 */
router.post(
  "/checkout",
  authenticateUser,
  getCheckoutDataValidation,
  handleCheckout
);

/**
 * get My order list
 * only registerd user can get his order list
 * method GET
 */
router.get("/my-order-history", authenticateUser, handleGetMyOrderHistory);
/**
 * get My order details
 * only registerd user can get his order details
 * method GET
 */
router.get("/my-order-details/:id", authenticateUser, handleGetMyOrderDetails);
/**
 * get  order list
 * only admin,super admin can get all order list
 * method GET
 */
router.get("/order-history", authenticateAdmin, handleGetOrderHistory);
/**
 * get order details
 * only admin,super admin can get any order details
 * method GET
 */
router.get("/order-details/:id", authenticateAdmin, handleGetOrderDetails);

/**
 * handle order status
 * only admin,super admin can get all order list
 * method PATCH
 */
router.patch(
  "/manage-order-status/:id",
  authenticateAdmin,
  getActiveStatusDataValidation,
  handleOrderStatus
);

export default router;
