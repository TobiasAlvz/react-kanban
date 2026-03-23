import type { Task } from "../entities/Task";
import { useTasks } from "../contexts/useTasks";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Media";
      case "low":
        return "Baixa";
      default:
        return priority;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "A fazer";
      case "doing":
        return "Em andamento";
      case "done":
        return "Concluido";
      default:
        return status;
    }
  };

  const getNextStatus = () => {
    if (task.status === "todo") return { status: "doing", label: "Iniciar" };
    if (task.status === "doing") return { status: "done", label: "Concluir" };
    return { status: "todo", label: "Reabrir" };
  };

  const handleUpdate = () => {
    const next = getNextStatus();
    updateTask(task.id, { status: next.status as Task["status"] });
  };

  const nextAction = getNextStatus();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong className="text-truncate" style={{ maxWidth: "70%" }}>
          {task.title}
        </strong>
        <span className={`badge bg-${getPriorityColor(task.priority)}`}>
          {getPriorityText(task.priority)}
        </span>
      </div>

      <div className="card-body">
        <p className="card-text small text-muted">
          {task.description || "Sem descricao"}
        </p>
        
        <div className="mt-2">
          <span className="badge bg-secondary">
            {getStatusText(task.status)}
          </span>
        </div>
      </div>

      <div className="card-footer d-flex justify-content-end gap-2">
        <button
          className={`btn btn-sm btn-${task.status === "done" ? "warning" : "primary"}`}
          onClick={handleUpdate}
        >
          {nextAction.label}
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteTask(task.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};