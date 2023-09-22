// Dependencies
const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  profileUpdate,
  profileDetails,
  verifyEmail,
  verifyOTP,
  resetPassword,
} = require("../controllers/UsersController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const {
  createTask,
  updateTaskStatus,
  deleteTask,
  listTaskByStatus,
  TaskStatusCount,
} = require("../controllers/TasksController");

// API End-Point:

// :::::: user ::::::
router.post("/user-registration", registration);
router.post("/user-login", login);
router.put("/user-profile-update", AuthVerifyMiddleware, profileUpdate);
router.get("/get-user-profile", AuthVerifyMiddleware, profileDetails);

// :::::: password recover ::::::
router.get("/verify-email/:email", verifyEmail);
router.get("/verify-otp/:email/:otp", verifyOTP);
router.post("/reset-password", resetPassword);

// :::::: task ::::::
router.post("/create-task", AuthVerifyMiddleware, createTask);
router.get("/update-task-status/:id/:status", AuthVerifyMiddleware, updateTaskStatus);
router.delete("/delete-task/:id", AuthVerifyMiddleware, deleteTask);
router.get("/list-task-by-status/:status", AuthVerifyMiddleware, listTaskByStatus);
router.get("/task-status-count", AuthVerifyMiddleware, TaskStatusCount);

// Exports
module.exports = router;
