const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default: `https://ibb.co/8474MbL`,
    },
  },
  { timestamps: true, versionKey: false }
);

// model
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
