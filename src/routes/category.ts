import { Router } from "express";
//controllers
import handleAddNewCategory from "../controllers/category/addNewCategory";
import handleGetActiveCategoryList from "../controllers/category/getActiveCategoryList";
import handleGetAllCategoryList from "../controllers/category/getAllCategoryList";
import handleDeleteCategory from "../controllers/category/deleteCategory";
import handleCategoryActiveStatus from "../controllers/category/manageCategoryActiveStatus";
import handleCategoryEdit from "../controllers/category/editCategory";
import handleGetCategoryDetails from "../controllers/category/getCategoryDetails";
//auth middlewares
import authenticateAdmin from "../middleware/authenticateAdmin";
//validations
import getAddCategoryDataValidation from "../validation/category/addCategory/addCategoryValidation";
import getEditCategoryDataValidation from "../validation/category/editCategory/editCategoryValidation";
import getActiveStatusDataValidation from "../validation/activeStatus/activeStatusValidation";
//router
const router = Router();
/**
 * add new category
 * only admin or super admin can do it
 */
router.post(
  "/add",
  authenticateAdmin,
  getAddCategoryDataValidation,
  handleAddNewCategory
);
/**
 * get all category list
 * only admin or super admin can do it
 */
router.get("/all-category-list", authenticateAdmin, handleGetAllCategoryList);
/**
 * get category details
 * only admin or super admin can do it
 */
router.get("/details/:id", authenticateAdmin, handleGetCategoryDetails);
/**
 * get active category list
 * public route
 */
router.get("/category-list", handleGetActiveCategoryList);
/**
 * delete category
 * only admin or super admin can do it
 */
router.delete("/:id", authenticateAdmin, handleDeleteCategory);

/**
 * update category status
 * only admin or super admin can do it
 * method PATCH
 */
router.patch(
  "/update-status/:id",
  authenticateAdmin,
  getActiveStatusDataValidation,
  handleCategoryActiveStatus
);
/**
 * edit category info
 * only admin or super admin can do it
 * method PATCH
 */
router.patch(
  "/edit/:id",
  authenticateAdmin,
  getEditCategoryDataValidation,
  handleCategoryEdit
);

export default router;
