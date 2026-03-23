import { createContext } from "react";
import type { Task } from "../entities/Task";

export interface TasksContextData {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (attributes: Omit<Task, "id">) => Promise<Task>;
  updateTask: (
    id: string | number,
    attributes: Partial<Omit<Task, "id">>
  ) => Promise<void>;
  deleteTask: (id: string | number) => Promise<void>;
  loadTasks: () => Promise<void>;
}

export const TasksContext = createContext({} as TasksContextData);