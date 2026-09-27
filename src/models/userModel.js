import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    image: { type: String },
    public_id: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Users", userSchema);
