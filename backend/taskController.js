const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
let tasks = [];
const generateId = () => {
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
  return maxId + 1;
};
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).send({ error: 'Title, description, and status are required' });
  }
  const newTask = { id: generateId(), title, description, status };
  tasks.push(newTask);
  res.status(201).send(newTask);
});
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filteredTasks = tasks.filter(task => task.status === status);
    res.send(filteredTasks);
  } else {
    res.send(tasks);
  }
});
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = tasks.find(task => task.id == id);
  if (!task) {
    return res.status(404).send({ error: 'Task not found' });
  }
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;
  res.send(task);
});
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id == id);
  if (index === -1) {
    return res.status(404).send({ error: 'Task not found' });
  }
  tasks = tasks.filter(task => task.id != id);
  res.status(204).send(); 
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});