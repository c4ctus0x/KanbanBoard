const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'To Do',
    enum: ['To Do', 'In Progress', 'Done']
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;