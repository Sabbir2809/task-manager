const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const { encodedToken } = require("../utility/Token");
const OTPModel = require("../models/OTPModel");
const { sendEmailWithNodeMailer } = require("../utility/sendEmailWithNodeMailer");

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
      message: "User Login Successful",
      token: token,
      data: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        photo: user.photo,
      },
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

// User Profile Get
exports.profileDetails = async (req, res) => {
  try {
    const email = req.headers.email;

    const data = await UserModel.aggregate([
      { $match: { email } },
      {
        $project: {
          _id: 1,
          email: 1,
          fullName: 1,
          photo: 1,
          password: 1,
        },
      },
    ]);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const email = req.params.email;
    // OTP Generate
    const OTP = Math.floor(100000 + Math.random() * 900000);

    // Email Query
    const existEmail = await UserModel.aggregate([{ $match: { email } }, { $count: "total" }]);

    if (existEmail.length > 0) {
      // OTP Insert
      await OTPModel.create({ email, otp: OTP });
      // email format & send email with nodemailer
      const emailData = {
        email,
        subject: "Task Manager",
        html: `
      <p>Hi, ${email}</p>
      <h1>Your Verify OTP Code: ${OTP}</h1>
    `,
      };
      await sendEmailWithNodeMailer(emailData);

      res.status(200).json({
        status: true,
        message: "Verification OTP Send, Please Check Your Given Email Address",
      });
    } else {
      res.status(400).json({ success: false, message: "Email Not Found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    // Email Query
    const OTPCount = await OTPModel.aggregate([{ $match: { email, otp, status: 0 } }, { $count: "total" }]);

    if (OTPCount.length > 0) {
      const data = await OTPModel.updateOne(
        { email, otp, status: 0 },
        { email, otp, status: 1 },
        { upsert: true }
      );

      res.status(200).json({
        status: true,
        message: "Verify OTP",
        data: data,
      });
    } else {
      res.status(400).json({ success: false, message: "OTP Code Already Used" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const newPassword = req.body.password;

    // Email Query
    const OTPCount = await OTPModel.aggregate([{ $match: { email, otp, status: 1 } }, { $count: "total" }]);

    if (OTPCount.length > 0) {
      // Hashed Password
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      const data = await UserModel.updateOne({ email }, { password: hashedPassword });

      res.status(200).json({
        status: true,
        message: "Successfully Password Reset",
        data: data,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
