import { Router } from "express";
//controllers
import handleStripeWebhook from "../controllers/stripe/stripeWebhook";
//router
const router = Router();
/**
 * handle stripe wehook
 * method POST
 */
router.post("/webhook", handleStripeWebhook);

export default router;
