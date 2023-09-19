const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const { encodedToken } = require("../utility/Token");

// Registration
exports.registration = async (req, res) => {
  try {
    const { email, password, fullName, photo } = req.body;

    // password validation
    if (password.length < 4) {
      return res
        .status(400)
        .json({ success: false, message: "The length of User password can be minimum 4 characters" });
    }

    // existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User Already Exist" });
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 8);

    // create user
    await UserModel.create({
      email,
      password: hashedPassword,
      fullName,
      photo,
    });

    // response
    res.status(201).json({
      status: true,
      message: "User Registration Successful",
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email is not registered" });
    }

    // password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // generate token
    const token = encodedToken(user.email, user._id);

    // response
    res.status(200).json({
      status: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Profile Update
exports.profileUpdate = async (req, res) => {
  try {
    const email = req.headers.email;
    const profileBody = req.body;

    const data = await UserModel.updateOne({ email }, profileBody);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
