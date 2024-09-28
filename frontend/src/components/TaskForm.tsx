import { useState } from "react";
import { Task } from "../types";
import { v4 as uuidv4 } from "uuid";

type TaskFormProps = {
  addTaskHandler: (task: Task) => Promise<void>;
};

export default function TaskForm({ addTaskHandler }: TaskFormProps) {
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskToAdd: Task = {
      id: uuidv4(), // Use UUID for unique ID
      title: newTask,
      isCompleted: false,
    };

    await addTaskHandler(taskToAdd); // Call the addTask function passed as a prop
    setNewTask(""); // Clear input
  };

  return (
    <div className="taskForm">
      <h1 className="text-2xl font-semibold text-center mb-4">Task Manager</h1>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <label htmlFor="input-text">New Task:</label>
        <input
          id="input-text"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button className="bg-blue-500 text-white rounded-r-md py-2 px-4 hover:bg-blue-600">
          ADD
        </button>
      </form>
    </div>
  );
}
