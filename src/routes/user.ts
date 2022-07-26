import { Router } from "express";
//controllers
import handleGetUserList from "../controllers/user/getUserList";
import handleUserActiveStatus from "../controllers/user/manageUserActiveStatus";
import handleUserSignup from "../controllers/user/signUp";
//auth middlewares
import authenticateAdmin from "../middleware/authenticateAdmin";
//validations
import getActiveStatusDataValidation from "../validation/activeStatus/activeStatusValidation";
import getSignUpDataValidation from "../validation/user/signUp/signUpValidation";
const router = Router();
/**
 * signup
 * method post
 */
router.post("/sign-up", getSignUpDataValidation, handleUserSignup);
/**
 * get all user list
 * only admin,super admin can access this
 */
router.get("/user-list", authenticateAdmin, handleGetUserList);
/**
 * update user status
 * only admin or super admin can change active status
 *
 */
router.patch(
  "/manage-user-status/:id",
  authenticateAdmin,
  getActiveStatusDataValidation,
  handleUserActiveStatus
);

export default router;
