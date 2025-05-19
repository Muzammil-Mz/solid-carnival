import repoModel from "../../models/Repos/Repos";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/getall", async (req: Request, res: Response): Promise<void> => {
  try {
    let getall = await repoModel.find({});
    res.status(StatusCodes.OK).json({ msg: getall });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
});

router.get(
  "/getone/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let params = req.params.id;
      let getone = await repoModel.findById(params);
      if (!getone) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: "user not found" });
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
      }
    }
  }
);
