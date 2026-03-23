import { useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { z } from "zod";
import { tasksService } from "../services/api";
import { TasksContext } from "./TasksContext";

const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasksService.fetchTasks().then(setTasks);
  }, []);

  const createTask = async (attributes: Omit<Task, "id">) => {
    const task = await tasksService.save(attributes);
    setTasks((current) => [...current, task]);
    return task;
  };

  const updateTask = async (
    id: number,
    attributes: Partial<Omit<Task, "id">>,
  ) => {
    const parsed = UpdateTaskSchema.parse(attributes);

    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, ...parsed } : task,
      ),
    );

  
  
  };

  const deleteTask = async (id: number) => {
    await tasksService.delete(id);
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};