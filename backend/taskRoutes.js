const express = require('express');
const router = express.Router();
const taskController = require('./taskController');

require('dotenv').config();

router.post('/tasks', (req, res) => {
  taskController.createTask(req, res);
});

router.get('/tasks', (req, res) => {
  const { status } = req.query;
  taskController.getTasks(req, res, status);
});

router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  taskController.updateTask(req, res, id);
});

router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  taskController.deleteTask(req, res, id);
});

module.exports = router;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});