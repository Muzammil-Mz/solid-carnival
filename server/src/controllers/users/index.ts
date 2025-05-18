import userModel from "../../models/Users/Users";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();
router.get("/getall", async (req: Request, res: Response): Promise<void> => {
  try {
    let allDb = await userModel.find({});
    const filteredUsers = allDb.map((user) => ({
      _id: user._id,
      email: user.email,
      phone: user.phone,
      emailVerified: user.userVerified?.email || false,
    }));

    res.status(StatusCodes.OK).json({ msg: filteredUsers });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
});

router.get("/getone/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    let id = req.params.id;
    let find = await userModel.findById(id);
    if (!find) {
      res.status(StatusCodes.NOT_FOUND).json("no user found");
      return;
    }
    res.status(StatusCodes.OK).json({ msg: find });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
});

router.put("/edit/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    let { phone, visibility } = req.body;
    let params = req.params.id;
    let edit = await userModel.findByIdAndUpdate(
      params,
      { $set: { phone, visibility } },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ msg: "data updated successfuly" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
});

router.delete(
  "/deleteuser/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      // take id from param
      let paramsId = req.params.id;

      // find user and delete
      let deleteUser = await userModel.findByIdAndDelete(paramsId);
      if (!deleteUser) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Can't Delete One User, Not Found in DB" });
        return;
      }

      res.status(StatusCodes.OK).json({ msg: "User Deleted Successfully!🥹💔" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
      }
    }
  }
);

// Delete all users
router.delete(
  "/deleteall",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let deleteall = await userModel.deleteMany({});

      if (!deleteall) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "No users found to delete 🙌" });
        return;
      }

      res
        .status(StatusCodes.OK)
        .json({ msg: "All Users Deleted Successfully!✅" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
      }
    }
  }
);

export default router;
