import React, { useState, useEffect } from "react";

interface ModalProps {
  onAddTask?: (description: string) => void;
}

function ModalAdd({ onAddTask }: ModalProps) {
  const [description, setDescription] = useState("");

  const handleAddTask = (description: string) => {
    if (onAddTask) {
      onAddTask(description);
    }
    setDescription("");
    (document.getElementById("modal_add") as HTMLDialogElement)?.close();
  };

  const handleCancel = () => {
    setDescription("");
    (document.getElementById("modal_add") as HTMLDialogElement)?.close();
  };

  return (
    <>
      <button
        className="btn btn-wide"
        onClick={() =>
          (
            document.getElementById("modal_add") as HTMLDialogElement
          )?.showModal()
        }
      >
        Add task
      </button>
      <dialog id="modal_add" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-left text-black">
            Add a new task
          </h3>
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
                onClick={() => handleAddTask(description)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ModalAdd;
