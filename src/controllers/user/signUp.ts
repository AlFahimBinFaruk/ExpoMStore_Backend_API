import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../../model/user";
import genarateToken from "../../utils/genarateToken";

interface ISignUp extends Document {
  username: string;
  email: string;
}

const handleUserSignup: RequestHandler = async (req, res, next) => {
  const { username, email }: ISignUp = req.body;

  try {
    const user = await User.findOne({ email });

    //
    if (user) {
      if (user.status === "active") {
        res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          token: genarateToken(user._id),
        });
      } else {
        return next(createHttpError(400, "You are not Authorized!!"));
      }
    } else {
      const newUser = new User({
        username,
        email,
        status: "active",
      });
      //create new admin.
      await newUser.save();
      res.status(200).json({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: genarateToken(newUser._id),
      });
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleUserSignup;
