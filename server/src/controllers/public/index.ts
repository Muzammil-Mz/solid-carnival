import userModel from "../../models/Users/Users";
import express, { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import config from "config";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/emailConnect";
import cryto from "crypto";

const JWT_KEY: string = config.get("JWT_KEY");
const URL: string = config.get("URL");
const USER: string = config.get("EMAIL");

const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    let { username, email, password, phone } = req.body;
    if (!email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "all fields required" });
      return;
    }
    let userExist = await userModel.findOne({ email });
    if (userExist) {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ msg: "email already exists" });
      return;
    }
    let hashpass = await bcrypt.hash(password, 10);
    let emailToken = Math.random().toString(36).substring(2);
    let newUser = {
      username,
      email,
      password: hashpass,
      phone,
      userVerifyToken: {
        email: emailToken,
      },
    };
    await userModel.create(newUser);
    const emailData = {
      from: USER,
      to: email,
      subject: "email verfication",
      text: `${URL}/api/public/emailverify/${emailToken}`,
    };
    await sendEmail(emailData);
    console.log(`${URL}/api/public/emailverify/${emailToken}`);
    res
      .status(200)
      .json({ msg: "user registered succesffully ,verfiy mail to login" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
});

router.get(
  "/emailverify/:token",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let token = req.params.token;
      const user = await userModel.findOne({ "userVerifyToken.email": token });

      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Token💔" });
        return;
      }
      if (user.userVerified.email == true) {
        res.status(StatusCodes.OK).json({ msg: "emai; already verified" });
        return;
      }
      if (user) {
        user.userVerified.email = true;
        user.userVerifyToken.email = null;
        await user.save();
      }

      res
        .status(StatusCodes.OK)
        .json({ mdg: "email verfifaction scuusesdfily" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
      }
    }
  }
);

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "all field required" });
      return;
    }
    let emailFind = await userModel.findOne({ email });
    if (!emailFind) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "no email found please register" });
      return;
    }

    let passCheck = await bcrypt.compare(password, emailFind.password);
    if (!passCheck) {
      res.status(StatusCodes.CONFLICT).json({ msg: "invalid passsword" });
      return;
    }
    let token = jwt.sign({ id: emailFind._id }, JWT_KEY, { expiresIn: "5h" });
    res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "user logged in successfully", token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
});

export default router;
