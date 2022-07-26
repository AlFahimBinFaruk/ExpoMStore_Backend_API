import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import Admin from "../../model/admin";
import genarateToken from "../../utils/genarateToken";

interface ILogin {
  username: string;
  password: string;
}

const handleAdminLogin: RequestHandler = async (req, res, next) => {
  const { username, password }: ILogin = req.body;

  try {
    //only if the admin is exits and his status is active he can login.
    const admin = await Admin.findOne({ username, status: "active" });

    //then if the password is correct
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.status(201).json({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role:admin.role,
        token: genarateToken(admin._id),
      });
    } else {
      return next(createHttpError(400, "You are not Authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleAdminLogin;
