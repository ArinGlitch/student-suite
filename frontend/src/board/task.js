import {create} from 'zustand';

const useTaskBoard = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),

}));