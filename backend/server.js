import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/task.route.js'; // Import the task routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Get the current directory

app.use(express.json()); // allow express to parse JSON data in req.body

// API routes should come before the static file serving and catch-all route
app.use("/api/tasks", taskRoutes); // Use the task routes

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
    
    // The catch-all route should be the last route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
