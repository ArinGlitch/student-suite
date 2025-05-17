import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
const router = express.Router();

export default router;

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);