import { useState } from "react";
import { useTasks } from "../contexts/useTasks";

interface CreateTaskFormProps {
  onSuccess?: () => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSuccess }) => {
  const { createTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Titulo e obrigatorio");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        status: "todo",
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError("Erro ao criar tarefa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-bold">Titulo</label>
        <input
          type="text"
          className="form-control"
          placeholder="Digite o titulo da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Descricao</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Digite a descricao da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Prioridade</label>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          disabled={loading}
        >
          <option value="low">Baixa</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Criando..." : "Criar tarefa"}
      </button>
    </form>
  );
};