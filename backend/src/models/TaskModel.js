const mongoose = require("mongoose");

// Schema
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String },
    email: { type: String },
  },
  { timestamps: true, versionKey: false }
);

// model
const TaskModel = mongoose.model("tasks", taskSchema);
module.exports = TaskModel;
