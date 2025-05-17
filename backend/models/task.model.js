import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a task title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a task description'],
    },
    dueDate: {
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: [true, 'Please add a task priority'],
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema); //produces a collection named 'tasks' in the database

export default Task;