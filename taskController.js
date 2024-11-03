const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.json());
let tasks = [];
let currentId = 1;
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required' });
  }
  const newTask = { id: currentId++, title, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
  res.json(filteredTasks);
});
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;
  res.json(task);
});
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});