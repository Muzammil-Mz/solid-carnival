import mongoose from "mongoose";
import config from "config";

let DB_URL:string = config.get<string>("DB_URL");

async function dbConnect() {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB CONNECTED SUCEESSFULLY");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();
