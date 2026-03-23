import type { Task } from "../entities/Task"

const BASE_URL = "http://localhost:3000/tasks"

export const tasksService = {
  async fetchTasks(): Promise<Task[]> {
    try {
      const res = await fetch(BASE_URL)
      if (!res.ok) throw new Error("Erro ao buscar tarefas")
      return res.json()
    } catch (error) {
      console.error("Erro no fetchTasks:", error)
      throw error
    }
  },

  async save(task: Omit<Task, "id">): Promise<Task> {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
      
      if (!res.ok) throw new Error("Erro ao salvar tarefa")
      return res.json()
    } catch (error) {
      console.error("Erro no save:", error)
      throw error
    }
  },

  async update(id: string | number, data: Partial<Task>) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!res.ok) throw new Error("Erro ao atualizar tarefa")
      return res.json()
    } catch (error) {
      console.error("Erro no update:", error)
      throw error
    }
  },

  async delete(id: string | number) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      })
      
      if (!res.ok) throw new Error("Erro ao deletar tarefa")
    } catch (error) {
      console.error("Erro no delete:", error)
      throw error
    }
  },
}