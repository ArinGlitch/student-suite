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
    deleteTask: async (tid) => {
        const res = await fetch(`/api/tasks/${tid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) {
            return {success: false, message: data.message};
        }
        set((state) => ({
            tasks: state.tasks.filter((task) => task._id !== tid),
        }));
        return {success: true, message: data.message};
    },
    updateTask: async (tid, updatedTask) => {
        const res = await fetch(`/api/tasks/${tid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });
        const data = await res.json();
        if (!data.success) {
            return {success: false, message: data.message};
        }
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task._id === tid ? data.data : task
            ),
        }));
        return {success: true, message: data.message};
    },
}));

export { useTaskBoard };