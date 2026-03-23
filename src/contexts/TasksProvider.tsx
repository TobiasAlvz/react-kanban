import { useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { tasksService } from "../services/api";
import { TasksContext } from "./TasksContext";

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setError(null);
      const data = await tasksService.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError("Erro ao carregar tarefas. Verifique se o backend está rodando.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (attributes: Omit<Task, "id">) => {
    try {
      setError(null);
      const task = await tasksService.save(attributes);
      setTasks((current) => [...current, task]);
      return task;
    } catch (err) {
      setError("Erro ao criar tarefa. Tente novamente.");
      console.error(err);
      throw err;
    }
  };

  const updateTask = async (
    id: string | number,
    attributes: Partial<Omit<Task, "id">>
  ) => {
    try {
      setError(null);
      
      // Optimistic update
      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, ...attributes } : task
        )
      );

      await tasksService.update(id, attributes);
    } catch (err) {
      setError("Erro ao atualizar tarefa. Recarregando dados...");
      console.error(err);
      await loadTasks(); // Rollback recarregando dados
      throw err;
    }
  };

  const deleteTask = async (id: string | number) => {
    try {
      setError(null);
      
      // Optimistic update
      setTasks((current) => current.filter((task) => task.id !== id));

      await tasksService.delete(id);
    } catch (err) {
      setError("Erro ao deletar tarefa. Recarregando dados...");
      console.error(err);
      await loadTasks(); // Rollback recarregando dados
      throw err;
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, loading, error, createTask, updateTask, deleteTask, loadTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};