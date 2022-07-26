import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../../model/user";

const handleGetUserList: RequestHandler = async (req, res, next) => {
  try {
    const role = req.user.role;
    //see if the validated role is of admin or superadmin
    if (role === "admin" || role === "super admin") {
      const userList = await User.find();
      res.status(201).json(userList);
    } else {
      return next(createHttpError(400, "You are not Authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleGetUserList;
