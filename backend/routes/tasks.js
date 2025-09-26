const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", protect, async (req, res) => {
  const { name, category, priority, deadline } = req.body;
  const task = new Task({ user: req.user._id, name, category, priority, deadline });
  await task.save();
  res.status(201).json(task);
});

router.put("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    console.error("Delete Task Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
