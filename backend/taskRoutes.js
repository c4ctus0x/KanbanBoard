const express = require('express');
const app = express();
const { Router } = express;
const router = Router();
const { createTask, getTasks, updateTask, deleteTask } = require('./taskController');

require('dotenv').config();

router.post('/tasks', createTask);

router.get('/tasks', (req, res) => {
  const { status } = req.query;
  getTasks(req, res, status);
});

router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  updateTask(req, res, id);
});

router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  deleteTask(req, res, id);
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});