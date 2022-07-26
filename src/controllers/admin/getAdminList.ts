import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Admin from "../../model/admin";

const handleGetAdminList: RequestHandler = async (req, res, next) => {
  try {
    const role = req.user.role;

    //see if the validated role is of admin or superadmin
    if (role === "admin" || role === "super admin") {
      const adminList = await Admin.find();
      res.status(201).json(adminList);
    } else {
      return next(createHttpError(400, "You are not Authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetAdminList;
