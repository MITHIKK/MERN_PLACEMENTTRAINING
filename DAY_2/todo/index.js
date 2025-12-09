const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const TodoModel = require("./todo");

const app = express();
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());


app.post('/insert', async (req, res) => {
  const { task, status } = req.body;

  const todo = new TodoModel({
    task,
    status
  });

  try {
    await todo.save();
    res.status(201).send("Task Added");
  } catch (error) {
    res.status(500).send("Error adding task");
  }
});


app.get('/read', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send("Error reading tasks");
  }
});


app.put('/update', async (req, res) => {
  const { id, newTask } = req.body;

  try {
    await TodoModel.findByIdAndUpdate(id, { task: newTask });
    res.status(200).send("Task Updated");
  } catch (error) {
    res.status(500).send("Error updating food item");
  }
});

app.delete('/delete/:id', async (req, res) => {
  const  id  = req.params.id;

  try {
    await TodoModel.findByIdAndDelete(id);
    res.status(200).send("Task Deleted");
  } catch (error) {
    res.status(500).send("Error deleting task");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
