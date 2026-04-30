const Task = require("../models/Task");


// 🟢 Create Task (Admin only)
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({
        msg: "Title, projectId and assignedTo are required"
      });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🟢 Get Tasks (Role-based)
exports.getTasks = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "member") {
      query.assignedTo = req.user.id;
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔄 Update Task Status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = ["todo", "in-progress", "done"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        msg: "You can only update your assigned tasks"
      });
    }

    task.status = status;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✏️ Update Task (Admin only)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🗑️ Delete Task (Admin only)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 📊 Dashboard
exports.getDashboard = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "member") {
      query.assignedTo = req.user.id;
    }

    const tasks = await Task.find(query);

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;
    const overdue = tasks.filter(
      t =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "done"
    ).length;

    res.json({
      total,
      completed,
      pending,
      overdue
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};