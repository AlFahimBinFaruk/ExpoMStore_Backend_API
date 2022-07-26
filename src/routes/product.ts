import { Router } from "express";
//controllers
import handleAddNewProduct from "../controllers/product/addNewProduct";
import handleDeleteProduct from "../controllers/product/deleteProduct";
import handleEditProduct from "../controllers/product/editProduct";
import handleGetActiveProductList from "../controllers/product/getActiveProductList";
import handleGetAllProductList from "../controllers/product/getAllProductList";
import handleGetProductDetails from "../controllers/product/getProductDetails";
import handleProductActiveStatus from "../controllers/product/manageProductActiveStatus";
//auth middlewares
import authenticateAdmin from "../middleware/authenticateAdmin";
//validations
import getActiveStatusDataValidation from "../validation/activeStatus/activeStatusValidation";
import getAddNewProductDataValidation from "../validation/product/addNewProduct/addNewProductValidation";
import getEditProductDataValidation from "../validation/product/editProduct/editProductValidation";
//router
const router = Router();
/**
 * add new product
 * only admin,super admin can do this..
 * method POST
 */
router.post(
  "/add",
  authenticateAdmin,
  getAddNewProductDataValidation,
  handleAddNewProduct
);
/**
 * delete product
 * only admin,super admin can do this..
 * method DELETE
 */
router.delete("/:id", authenticateAdmin, handleDeleteProduct);
/**
 * edit product
 * only admin,super admin can do this..
 * method PATCH
 */
router.patch(
  "/edit/:id",
  authenticateAdmin,
  getEditProductDataValidation,
  handleEditProduct
);
/**
 * handle product active status
 * only admin,super admin can do this..
 * method PATCH
 */
router.patch(
  "/update-status/:id",
  authenticateAdmin,
  getActiveStatusDataValidation,
  handleProductActiveStatus
);

/**
 * get all product list
 * only admin,super admin can do this..
 * method GET
 */
router.get("/get-all-product-list", authenticateAdmin, handleGetAllProductList);
/**
 * get active product list
 * PUBLIC route
 * method GET
 */
router.get("/get-product-list", handleGetActiveProductList);
/**
 * get product details
 * PUBLIC route
 * method GET
 */
router.get("/details/:id", handleGetProductDetails);

export default router;
