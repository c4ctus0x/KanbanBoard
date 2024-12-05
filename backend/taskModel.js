const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring for a cleaner approach

// Defining the task schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,  // Indicating title is a must-have field
  },
  description: {
    type: String,
    required: false, // Description is optional
  },
  status: {
    type: String,
    default: 'To Do', // Default status is 'To Do'
    enum: ['To Do', 'In Progress', 'Done'], // Enum to ensure status is one of the predefined values
  },
});

// Compiling our schema into a model
const Task = mongoose.model('Task', taskSchema);

// Exporting the Task model for use in other parts of the app
module.exports = Task;