import React from "react";
import { Task } from "../services/Helper";
import ModalEdit from "./ModalEdit";

interface CardProps {
  task: Task;
  onEdit?: (id: number, description: string) => void;
  onMove?: (id: number, status: "To Do" | "In Progress" | "Done") => void;
  onDelete: (taskId: number) => void;
}

function Card({ task, onDelete, onMove, onEdit }: CardProps) {
  const handleEdit = (id: number, description: string) => {
    if (onEdit) onEdit(id, description);
  };
  const handleMove = (id: number, status: string) => {
    const newStatus = status === "To Do" ? "In Progress" : "Done";
    if (onMove) onMove(id, newStatus);
  };
  const handleDelete = (taskId: number) => {
    onDelete(taskId);
  };

  return (
    <div className="card w-full bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{task.status}</h2>
        <p>{task.description}</p>
        <div className="card-actions justify-end">
          {task.status === "To Do" && (
            <div>
              <ModalEdit task={task} onEditTask={handleEdit} />
              <button
                className="btn btn-ghost"
                onClick={() => handleMove(task.id, task.status)}
              >
                Move
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          )}
          {task.status === "In Progress" && (
            <div>
              <button
                className="btn btn-ghost"
                onClick={() => handleMove(task.id, task.status)}
              >
                Move
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          )}
          {task.status === "Done" && (
            <button
              className="btn btn-ghost"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
