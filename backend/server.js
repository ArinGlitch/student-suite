import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Task from './models/task.model.js'; // Import the Task model
import taskRoutes from './routes/task.route.js'; // Import the task routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow express to parse JSON data in req.body

app.use("/api/tasks", taskRoutes); // Use the task routes

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
