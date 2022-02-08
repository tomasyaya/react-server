const Task = require("./task.model");
const mongoose = require("mongoose");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// this controller handles the get all task owned but the current logged in user
async function getTasks(req, res) {
  try {
    const {_id: userId} = req.session.user
    // the .lean() is to retrieve a plain javascript object and not a mongoose document which has a lot of
    // extra features tha tyou are not going to use
    const tasks = await Task.find({owner: userId}).lean();
    res.status(200).json(tasks).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// gets a task by its id
async function getTaskById(req, res) {
  try {
    const { taskId } = req.params;
    if (!isObjectId(taskId)) {
      res.status(400).json("Id not valid").end();
    }
    const task = await Task.findById(taskId).populate("tasks").lean();
    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

//  creates the task
async function createTask(req, res) {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// updates a task by its id
async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    if (!isObjectId(taskId)) {
      res.status(400).json("Id not valid").end();
    }
    const task = await Task.findByIdAndUpdate(req.body, {
      new: true,
    }).lean();

    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// deletes a task by its id
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    if (!isObjectId(taskId)) {
      res.status(400).json("Id not valid").end();
    }
    const task = await Task.findByIdAndDelete(taskId).lean();
    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
  getTaskById,
  getTasks,
  updateTask,
  createTask,
  deleteTask,
};
