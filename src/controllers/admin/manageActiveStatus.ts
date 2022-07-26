import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Admin from "../../model/admin";

interface IActiveStatus {
  status: string;
}

const handleActiveStatus: RequestHandler = async (req, res, next) => {
  const { status }: IActiveStatus = req.body;
  try {
    //id of account i want to update status
    const id = req.params.id;
    //check role of auth user (if he is admin/super admin or not)
    const role = req.user.role;

    //only admin and super admin can update status
    if (role === "admin" || role === "super admin") {
      //see if account exits
      const accountExits = await Admin.findById(id);
      //if the account exits and it is not of super admin then we will update status
      if (accountExits && accountExits.role !== "super admin") {
        const updatedAcc = await Admin.findByIdAndUpdate(
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

export default handleActiveStatus;
