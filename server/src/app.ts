import express, { Application, Request, Response } from "express";
import config from "config";
import { StatusCodes } from "http-status-codes";
import "./utils/dbConnect";
import userPublic from "./controllers/public/index";
import userRouter from "./controllers/users/index";
import authMiddleware from "./middlewares/auth";

const app: Application = express();
const PORT = config.get("PORT");

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "hewllo world" });
});

app.use("/api/public", userPublic);
app.use("/api/users", authMiddleware, userRouter);

app.listen(PORT, () => {
  console.log(`server is up and running ${PORT}`);
});
