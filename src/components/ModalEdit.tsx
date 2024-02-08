import React, { useState } from "react";
import { Task } from "../services/Helper";

interface ModalEditProps {
  task: Task;
  ordinal: number;
  onEditTask: (id: number, description: string) => void;
}

function ModalEdit({ task, ordinal, onEditTask }: ModalEditProps) {
  const [description, setDescription] = useState("");

  const handleEditTask = (id: number, description: string) => {
    if (onEditTask) {
      onEditTask(id, description);
    }
    setDescription("");
    (
      document.getElementById(`${task.id}${ordinal}`) as HTMLDialogElement
    )?.close();
  };

  const handleOpen = () => {
    (
      document.getElementById(`${task.id}${ordinal}`) as HTMLDialogElement
    )?.showModal();
  };

  const handleCancel = () => {
    setDescription("");
    (
      document.getElementById(`${task.id}${ordinal}`) as HTMLDialogElement
    )?.close();
  };

  return (
    <>
      <button className="btn btn-ghost" onClick={() => handleOpen()}>
        Edit task
      </button>
      <dialog id={`${task.id}${ordinal}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-left text-black">Edit task</h3>
          <div className="flex items-start">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <div className="flex items-center gap-3">
              <button className="btn" onClick={() => handleCancel()}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleEditTask(task.id, description)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}


export default ModalEdit;
