import { useRef } from "react";
import { TasksProvider } from "./contexts/TasksProvider";
import { TaskBoard } from "./components/TaskBoard";
import { CreateTaskForm } from "./components/CreateTaskForm";

function App() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  return (
    <TasksProvider>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6">React Kanban</h1>

          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#createTaskModal"
          >
            Nova tarefa
          </button>
        </div>

        <div
          className="modal fade"
          id="createTaskModal"
          tabIndex={-1}
          aria-labelledby="createTaskModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title fs-5" id="createTaskModalLabel">
                  Criar nova tarefa
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                  ref={closeButtonRef}
                />
              </div>

              <div className="modal-body">
                <CreateTaskForm onSuccess={closeModal} />
              </div>
            </div>
          </div>
        </div>

        <TaskBoard />
      </div>
    </TasksProvider>
  );
}

export default App;
