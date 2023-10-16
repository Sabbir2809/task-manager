// Dependencies
const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const TasksController = require("../controllers/TasksController");

// API End-Point:

// :::::: user ::::::
router.post("/user-registration", UsersController.registration);
router.post("/user-login", UsersController.login);
router.put("/user-profile-update", AuthVerifyMiddleware, UsersController.profileUpdate);
router.get("/get-user-profile", AuthVerifyMiddleware, UsersController.profileDetails);
// :::::: password recover ::::::
router.get("/verify-email/:email", UsersController.verifyEmail);
router.get("/verify-otp/:email/:otp", UsersController.verifyOTP);
router.post("/reset-password", UsersController.resetPassword);

// :::::: task ::::::
router.post("/create-task", AuthVerifyMiddleware, TasksController.createTask);
router.get("/update-task-status/:id/:status", AuthVerifyMiddleware, TasksController.updateTaskStatus);
router.delete("/delete-task/:id", AuthVerifyMiddleware, TasksController.deleteTask);
router.get("/list-task-by-status/:status", AuthVerifyMiddleware, TasksController.listTaskByStatus);
router.get("/task-status-count", AuthVerifyMiddleware, TasksController.TaskStatusCount);
router.get("/find-task/:searchKeyword", AuthVerifyMiddleware, TasksController.findTask);

// Exports
module.exports = router;
