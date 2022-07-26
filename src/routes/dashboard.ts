import { Router } from "express";
//controllers
import handleGetSiteOverview from "../controllers/dashboard/getSiteOverview";
//auth middlewares
import authenticateAdmin from "../middleware/authenticateAdmin";

const router = Router();
/**
 * get site overview
 * only admin,super admin can access this
 * method get
 */
router.get("/overview", authenticateAdmin, handleGetSiteOverview);

export default router;
