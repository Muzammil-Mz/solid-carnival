import mongoose, { Document, Schema, Model } from "mongoose";

interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  employmentStatus: string;
  userVerified: {
    email: boolean | null;
  };
  userVerifyToken: {
    email: string | null;
  };
}

const userSchema = new Schema<Iuser>({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  employmentStatus: {
    type: String,
  },
});

const userModel: Model<Iuser> = mongoose.model<Iuser>(
  "users",
  userSchema,
  "Users"
);
