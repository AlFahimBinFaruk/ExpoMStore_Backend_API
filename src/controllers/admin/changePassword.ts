import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import Admin from "../../model/admin";
import genarateHashPassword from "../../utils/genarateHashPassword";

interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
}

const handleChangePassword: RequestHandler = async (req, res, next) => {
  const { oldPassword, newPassword }: IPasswordChange = req.body;

  try {
    const id = req.user.id;
    //only if the admin is exits and his status is active he can login.
    const admin = await Admin.findById(id);

    //then if the password is correct
    if (admin && (await bcrypt.compare(oldPassword, admin.password))) {
      const hashpassword = await genarateHashPassword(newPassword);
      await Admin.findByIdAndUpdate(id, { password: hashpassword });
      res.status(200).json({ msg: "Password Updated!!" });
    } else {
      return next(createHttpError(400, "Incorrent Password!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleChangePassword;
