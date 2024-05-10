import { _mongoInstance } from "../connection/db.js";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      set: function (v) {
        return `${v}`.toLowerCase();
      },
    },
    phone: {
      type: Number,
    },
    userType: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    password: {
      type: String,
      set: (val) => {
        return bcrypt.hashSync(val, 10);
      },
      select: false,
    },
    photo: { type: String, contentType: String },
    bio: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = _mongoInstance.model("User", UserSchema);
export default UserModel;
