import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import { Task } from "./types";
import {
  addTasktoDB,
  deleteTaskfromDB,
  fetchTasksfromDB,
  toggleTaskCompletioninDB,
  updateTaskinDB,
} from "./api";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasksHandler = async () => {
      const tasksFromDB = await fetchTasksfromDB();
      setTasks(tasksFromDB);
    };

    fetchTasksHandler();
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks); // keep tasks monitored
  }, [tasks]);

  const addTaskHandler = async (newTask: Task) => {
    await addTasktoDB(newTask);
    setTasks((filteredTasks) => [
      ...filteredTasks,
      { id: uuidv4(), title: newTask.title, isCompleted: false },
    ]);
  };

  const deleteTaskHandler = async (taskId: string) => {
    await deleteTaskfromDB(taskId);
    setTasks(filteredTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskHandler = async (taskId: string, isCompleted: boolean) => {
    await toggleTaskCompletioninDB(taskId, !isCompleted);
    setTasks(
      filteredTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const updateTaskHandler = async (taskId: string, newTitle: string) => {
    await updateTaskinDB(taskId, newTitle);
    setTasks(
      filteredTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-11/12 md:w-8/12">
        <TaskForm addTaskHandler={addTaskHandler} />
        <FilterButtons tasks={tasks} setFilteredTasks={setFilteredTasks} />
        <TaskList
          filteredTasks={filteredTasks}
          deleteTask={deleteTaskHandler}
          toggleTask={toggleTaskHandler}
          updateTask={updateTaskHandler}
        />
      </div>
    </div>
  );
}
