import { Router } from "express";
const router = Router();

import adminRoutes from "./admin";
import userRoutes from "./user";
import categoryRoutes from "./category";
import productRoutes from "./product";
import orderRoutes from "./order";
import stripeRoutes from "./stripe";
import dashboardRoutes from "./dashboard";

//admin routes
router.use("/api/admin", adminRoutes);
//user routes
router.use("/api/user", userRoutes);
//category routes
router.use("/api/category", categoryRoutes);
//product routes
router.use("/api/product", productRoutes);
//order routes
router.use("/api/order", orderRoutes);
//stripe routes
router.use("/api/stripe", stripeRoutes);
//dashboard
router.use("/api/dashboard", dashboardRoutes);

export default router;
