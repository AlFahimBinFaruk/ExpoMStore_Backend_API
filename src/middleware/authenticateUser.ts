import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
//user model
import User from "../model/user";

//Jwt Payload interface
interface JwtPayload {
  id: string;
}

// see if the user has send the data needed to authorize him
const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //verify
      const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      //get user creds from the token
      const user = await User.findById(id).select("-password");
      if (user) {
        req.user = user;
        next();
      } else {
        return next(createHttpError(401, "Not Authorized"));
      }
    } catch (error) {
      return next(createHttpError(401, "Not Authorized"));
    }
  }
  //if token is not provided..
  if (!token) {
    return next(createHttpError(401, "Not Authorized and no Token Given."));
  }
};
export default authenticateUser;
