import { useContext } from "react"
import { TasksContext } from "./TasksContext"

export const useTasks = () => {
  return useContext(TasksContext)
}