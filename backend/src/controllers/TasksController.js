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

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const status = req.params.status;
    const taskBody = { status: status };

    const task = await TaskModel.updateOne(query, taskBody, { upsert: true });

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

// Search Task
exports.findTask = async (req, res) => {
  try {
    const searchKeyword = req.params.searchKeyword;
    const email = req.headers.email;

    const searchRegex = { $regex: searchKeyword, $options: "i" };
    const searchQuery = {
      $or: [{ title: searchRegex }, { description: searchRegex }, { status: searchRegex }],
    };

    let data = await TaskModel.aggregate([{ $match: searchQuery }, { $match: { email: email } }]);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
