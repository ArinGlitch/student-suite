import {create} from 'zustand';

const useTaskBoard = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    createTask: async (newTask) => {
        if (!newTask.title || !newTask.priority || !newTask.description) {
            return {success: false, message: "Please fill all required fields"};
        }
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        const data = await res.json();
        set((state) => ({
            tasks: [...state.tasks, data.data],
        }));
        return {success: true, message: "Task created successfully"};
    },
    fetchTasks: async () => {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        set({ tasks: data.data });
    },
}));

export { useTaskBoard };