const TaskModel = require("../models/TaskModel");

// Create Task
exports.createTask = async (req, res) => {
  try {
    let taskBody = req.body;
    taskBody.email = req.headers.email;

    const task = await TaskModel.create(taskBody);

    res.status(200).json({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Create Task
exports.updateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const status = req.params.status;
    const taskBody = { status: status };

    const task = await TaskModel.updateOne(query, taskBody);

    res.status(200).json({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// delete Task
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };

    const data = await TaskModel.deleteOne(query);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// List Task By Status
exports.listTaskByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const email = req.headers.email;

    const task = await TaskModel.aggregate([
      { $match: { status, email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdAt: {
            $dateToString: {
              date: "$createdAt",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ]);

    res.status(200).json({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Task Status Count
exports.TaskStatusCount = async (req, res) => {
  try {
    const email = req.headers.email;

    const task = await TaskModel.aggregate([
      { $match: { email } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);

    res.status(200).json({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
