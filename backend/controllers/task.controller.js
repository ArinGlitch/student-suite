import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error("Error in fetching tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createTask = async (req, res) => {
    const task = req.body; //User will send this data
        
        if (!task.title || !task.description || !task.priority) {
            return res.status(400).json({ success: false, message: "Please add a title, description and a priority" });
        }

        const newTask = new Task(task);
    
    try {
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error("Error in Create Task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task, {new: true});
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Task not found" });
    }
};