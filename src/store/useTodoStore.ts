import { create } from "zustand";
import type { Task } from "../types/Todo";

interface TodoState {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string) => void;
  cancelEdit: (id: string) => void;
  updateTaskText: (id: string, text: string) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  tasks: [],

  addTask: (text: string) => set((state) => ({
    tasks: [
      ...state.tasks,
      { id: Date.now().toString(), text, completed: false, isEditing: false } as Task,
    ],
  })),

  removeTask: (id: string) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),

  toggleTask: (id: string) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),

  editTask: (id: string) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, isEditing: true } : task
    )
  })),

  cancelEdit: (id: string) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, isEditing: false } : task
    )
  })),

  updateTaskText: (id: string, text: string) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, text, isEditing: false } : task
    )
  })),
}));

export default useTodoStore;