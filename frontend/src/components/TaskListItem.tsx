// components/TaskListItem.tsx

import { useState } from "react";
import { Task } from "../types";

type TaskListItemProps = {
  task: Task;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTask: (taskId: string, isCompleted: boolean) => Promise<void>;
  updateTask: (taskId: string, updatedTask: string) => Promise<void>;
};

export default function TaskListItem({
  task,
  deleteTask,
  toggleTask,
  updateTask,
}: TaskListItemProps) {
  const [editMode, setEditMode] = useState<boolean>(false); // edit mode for buttons
  const [editTitle, setEditTitle] = useState<string>(task.title); //  state for editing title

  const handleDelete = () => {
    deleteTask(task.id); // database function's return type is promise, it must be wrapped with void type to be called by html click event
  };

  const handleToggle = () => {
    toggleTask(task.id, task.isCompleted); // toggle function gets id and isCobleted args
  };

  const handleEdit = () => {
    updateTask(task.id, editTitle);
    setEditMode(false); // Exit edit mode
  };

  return (
    <div className="flex px-2 justify-between items-center">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
          className="mx-4"
        />
        {editMode ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-1"
          />
        ) : (
          <span
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="buttons flex items-center">
        {!editMode ? (
          <>
            <button
              onClick={() => {
                setEditMode(true);
                setEditTitle(task.title); // Set the title for editing
              }}
              className="bg-green-600 text-white rounded-lg px-2 mx-1"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white rounded-lg px-2"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white rounded-lg px-2 mx-1"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)} // Cancel editing
              className="bg-red-600 text-white rounded-lg px-2"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
