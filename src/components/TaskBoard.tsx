import { useTasks } from "../contexts/useTasks";
import { TaskCard } from "./TaskCard";

export const TaskBoard: React.FC = () => {
  const { tasks, loading, error } = useTasks();

  const renderColumn = (status: "todo" | "doing" | "done", title: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    
    return (
      <div className="col-md-4">
        <div className="card h-100">
          <div className="card-header bg-secondary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="h6 mb-0 fw-bold">{title}</h3>
              <span className="badge bg-light text-dark">
                {filteredTasks.length} tarefa{filteredTasks.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto", minHeight: "400px" }}>
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            
            {filteredTasks.length === 0 && (
              <p className="text-muted text-center mt-5">
                Nenhuma tarefa aqui
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2 text-muted">Carregando tarefas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Erro:</strong> {error}
        <br />
        <small>Verifique se o backend está rodando em http://localhost:3000</small>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {renderColumn("todo", "Para Fazer")}
      {renderColumn("doing", "Em Progresso")}
      {renderColumn("done", "Concluido")}
    </div>
  );
};