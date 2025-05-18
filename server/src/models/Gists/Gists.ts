import mongoose, { Document, Schema, Model } from "mongoose";
interface Igist extends Document {
  title: string;
  description: string;
  visibility: string;
}

const gistSchema: Schema = new Schema<Igist>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  visibility: {
    type: String,
  },
});

const gistModel: Model<Igist> = mongoose.model<Igist>(
  "Gist",
  gistSchema,
  "gist"
);

export default gistModel;
