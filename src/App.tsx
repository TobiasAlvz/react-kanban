import { TasksProvider } from "./contexts/TasksProvider";
import { TaskBoard } from "./components/TaskBoard";
import { CreateTaskForm } from "./components/CreateTaskForm";
// import { Modal } from "bootstrap";

function App() {
  // const modal = new Modal("#createTaskModal");

  return (
    <TasksProvider>
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-4">
          <h1 className="position-sticky top-0">React Kanban</h1>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createTaskModal"
          >
            Nova tarefa
          </button>

          <div
            className="modal fade"
            id="createTaskModal"
            tabIndex={-1}
            aria-labelledby="createTaskModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title" id="createTaskModalLabel">
                    Nova tarefa
                  </h2>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <CreateTaskForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-4">
            <h2 className="mb-3">Quadro de tarefas</h2>
            <TaskBoard />
          </div>
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
