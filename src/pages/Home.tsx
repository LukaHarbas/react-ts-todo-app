import React, { useState, useEffect } from "react";
import { Task, addTask, editTask, deleteTask } from "../services/Helper";
import Card from "../components/Card";
import ModalAdd from "../components/ModalAdd";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("all");

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  const handleAddTask = (description: string) => {
    try {
      const response = addTask(tasks, description);
      if (response.success) {
        getItems();
      }
    } catch {
      console.error("Error adding task");
    }
  };

  const handleEditTask = (id: number, newDescription: string) => {
    try {
      const response = editTask(tasks, id, newDescription);
      if (response.success) {
        getItems();
      }
    } catch {
      console.error("Error editing task");
    }
  };

  const handleMoveTask = (
    id: number,
    newStatus: "To Do" | "In Progress" | "Done"
  ) => {
    try {
      const response = editTask(tasks, id, "", newStatus);
      if (response) {
        getItems();
      }
    } catch {
      console.error("Error moving task");
    }
  };

  const handleDeleteTask = (id: number) => {
    try {
      const response = deleteTask(tasks, id);
      if (response.success) {
        getItems();
      }
    } catch {
      console.error("Error deleting task");
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.length === 0) {
      setFilteredTasks([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      // Filter tasks based on search term
      const filtered = tasks.filter((task) =>
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="w-full min-h-screen py-20 grid grid-flow-row-dense place-items-center bg-teal-400">
      <div role="tablist" className="tabs tabs-bordered row-span-4">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="All Tasks"
          checked={selectedTab === "all"}
          onChange={() => setSelectedTab("all")}
        />
        <div role="tabpanel" className="tab-content	p-10">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="input input-bordered max-w-sm"
              placeholder="Search tasks"
              onChange={(e) => handleSearch(e.target.value)}
            />
            {isSearching
              ? filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    task={task}
                    ordinal={0}
                    onEdit={handleEditTask}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              : tasks.map((task) => (
                  <Card
                    key={task.id}
                    task={task}
                    ordinal={1}
                    onEdit={handleEditTask}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="To Do"
          checked={selectedTab === "To Do"}
          onChange={() => setSelectedTab("To Do")}
        />
        <div role="tabpanel" className="tab-content	p-10">
          <div className="flex flex-col gap-3">
            {tasks.map(
              (task) =>
                task.status === "To Do" && (
                  <Card
                    key={task.id}
                    task={task}
                    ordinal={2}
                    onEdit={handleEditTask}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                  />
                )
            )}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="In Progress"
          checked={selectedTab === "In Progress"}
          onChange={() => setSelectedTab("In Progress")}
        />
        <div role="tabpanel" className="tab-content	p-10">
          <div className="flex flex-col gap-3">
            {tasks.map(
              (task) =>
                task.status === "In Progress" && (
                  <Card
                    key={task.id}
                    task={task}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                  />
                )
            )}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Done"
          checked={selectedTab === "Done"}
          onChange={() => setSelectedTab("Done")}
        />
        <div role="tabpanel" className="tab-content	p-10">
          <div className="flex flex-col gap-3">
            {tasks.map(
              (task) =>
                task.status === "Done" && (
                  <Card key={task.id} task={task} onDelete={handleDeleteTask} />
                )
            )}
          </div>
        </div>
      </div>
      <ModalAdd onAddTask={handleAddTask} />
    </div>
  );
}

export default Home;
