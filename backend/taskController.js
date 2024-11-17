const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
const generateId = () => {
  return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
};

app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).send({ error: 'Title, description, and status are required.' });
  }
  const newTask = { id: generateId(), title, description, status };
  tasks.push(newTask);
  res.status(201).send(newTask);
});

app.get('/tasks', (req, res) => {
  const { status } = req.query;
  const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
  res.send(filteredTasks);
});

app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id == id);
  if (taskIndex === -1) {
    return res.status(404).send({ error: 'Task not found' });
  }
  
  const task = tasks[taskIndex];
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  tasks[taskIndex] = task;

  res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id != id);
  const wasDeleted = initialLength !== tasks.length;
  
  if (!wasDeleted) {
    return res.status(404).send({ error: 'Task not found' });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});