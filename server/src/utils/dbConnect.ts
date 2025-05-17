import mongoose from "mongoose";
import config from "config";

let DBURL = config.get("DB_URL");

async function dbConnect() {
  try {
    await mongoose.connect("DBURL");
    console.log("DB CONNECTED SUCEESSFULLY");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();
