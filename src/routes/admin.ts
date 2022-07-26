import { Router } from "express";
//controllers
import handleAdminLogin from "../controllers/admin/login";
import handleAdminRegister from "../controllers/admin/register";
import handleChangePassword from "../controllers/admin/changePassword";
import handleGetAdminList from "../controllers/admin/getAdminList";
import handleActiveStatus from "../controllers/admin/manageActiveStatus";
//auth middlewares
import authenticateAdmin from "../middleware/authenticateAdmin";
//validations
import getLoginDataValidation from "../validation/admin/login/loginValidation";
import getRegisterDataValidation from "../validation/admin/register/registerValidation";
import getChangePasswordDataValidation from "../validation/admin/changePassword/changePasswordValidation";
import getActiveStatusDataValidation from "../validation/activeStatus/activeStatusValidation";
const router = Router();
/**
 * login admin,delivery man
 * method post
 */
router.post("/login", getLoginDataValidation, handleAdminLogin);
/**
 * register admin,delivery man
 * method post
 */
router.post("/", getRegisterDataValidation, handleAdminRegister);

/**
 * change password
 * only admin,super admin ,delivery man can change their own password
 */
router.patch(
  "/change-password",
  authenticateAdmin,
  getChangePasswordDataValidation,
  handleChangePassword
);

/**
 * get all admin list
 * only admin,super admin can access this
 */
router.get("/admin-list", authenticateAdmin, handleGetAdminList);
/**
 * update admin ,delivery man status
 * only admin or super admin can change active status
 * super admin status will always be active
 */
router.patch(
  "/manage-status/:id",
  authenticateAdmin,
  getActiveStatusDataValidation,
  handleActiveStatus
);

export default router;
