export interface Task {
  id: number;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

export const addTask = (tasks: Task[], description: string) => {
  const newTask: Task = {
    id: tasks.length + 1,
    description,
    status: "To Do",
  };
  localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  return { success: true, message: "Task added successfully" };
};

export const editTask = (
  tasks: Task[],
  id: number,
  newDescription: string,
  status?: string
) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? newDescription.length > 0
        ? { ...task, description: newDescription }
        : { ...task, status: status }
      : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return { success: true, message: "Task updated successfully" };
};

export const deleteTask = (tasks: Task[], id: number) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return { success: true, message: "Task deleted successfully" };
};
