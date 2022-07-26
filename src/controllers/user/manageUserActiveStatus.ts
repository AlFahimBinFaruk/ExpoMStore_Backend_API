import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../../model/user";

interface IActiveStatus {
  status: string;
}

const handleUserActiveStatus: RequestHandler = async (req, res, next) => {
  const { status }: IActiveStatus = req.body;
  try {
    //id of account i want to update status
    const id = req.params.id;
    //check role of auth user (if he is admin/super admin or not)
    const role = req.user.role;

    //only admin and super admin can update status
    if (role === "admin" || role === "super admin") {
      //see if account exits
      const accountExits = await User.findById(id);
      //if the account exits and it is not of super admin then we will update status
      if (accountExits) {
        const updatedAcc = await User.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        //send updated account details
        res.status(201).json(updatedAcc);
      } else {
        return next(createHttpError(400, "You are not Authorized!!"));
      }
    } else {
      return next(createHttpError(400, "You are not Authorized!!"));
    }
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export default handleUserActiveStatus;
