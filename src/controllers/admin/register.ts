import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Admin from "../../model/admin";
import genarateHashPassword from "../../utils/genarateHashPassword";

interface IRegister extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const handleAdminRegister: RequestHandler = async (req, res, next) => {
  const { username, email, password, role }: IRegister = req.body;

  try {
    const admin = await Admin.findOne({ username }, { email });

    //if admin exits you cannot go further.
    if (admin) {
      return next(createHttpError(400, "Already Registered!!"));
    } else {
      const hashpassword = await genarateHashPassword(password);
      const newAdmin = new Admin({
        username,
        email,
        password: hashpassword,
        role,
        status: "deactive",
      });
      //create new admin.
      await newAdmin.save();
      res
        .status(200)
        .json({ message: "Account registered.Wait for Admin to Approve." });
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleAdminRegister;
