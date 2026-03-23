import { useContext, type FormEventHandler } from "react";
import { TasksContext } from "../contexts/TasksContext";
import { z } from "zod";

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

export const CreateTaskForm: React.FC = () => {
  const { createTask } = useContext(TasksContext);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const taskData = CreateTaskSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      priority: formData.get("priority"),
    });

    await createTask(taskData);

    ev.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title">Título</label>
        <input
          className="form-control"
          type="text"
          name="title"
          id="title"
          autoFocus
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description">Descrição</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
        ></textarea>
      </div>

      <div className="mb-3">
        <div>Status</div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="todo"
            value="todo"
          />
          <label className="form-check-label" htmlFor="todo">
            Para Fazer
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="doing"
            value="doing"
          />
          <label className="form-check-label" htmlFor="doing">
            Em Progresso
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="done"
            value="done"
          />
          <label className="form-check-label" htmlFor="done">
            Completada
          </label>
        </div>
      </div>

      <div className="mb-3">
        <div>Prioridade</div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priority"
            id="low"
            value="low"
          />
          <label className="form-check-label" htmlFor="low">
            Baixa
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priority"
            id="medium"
            value="medium"
          />
          <label className="form-check-label" htmlFor="medium">
            Média
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priority"
            id="high"
            value="high"
          />
          <label className="form-check-label" htmlFor="high">
            Alta
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Criar Tarefa
      </button>
    </form>
  );
};
