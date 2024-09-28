// api.ts
import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:4000/api/v01/task";

export const fetchTasksfromDB = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  //console.log("res data ------->", response.data.data);
  return response.data.data;
};

export const addTasktoDB = async (newTask: Task): Promise<Task> => {
  const response = await axios.post(API_URL, newTask);
  return response.data.data;
};

export const updateTaskinDB = async (
  taskId: string,
  newTitle: string
): Promise<Task> => {
  const response = await axios.patch(`${API_URL}/${taskId}`, {
    title: newTitle,
  });
  return response.data.data;
};

export const deleteTaskfromDB = async (taskId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${taskId}`);
};

export const toggleTaskCompletioninDB = async (
  taskId: string,
  isCompleted: boolean
): Promise<Task> => {
  const response = await axios.patch(`${API_URL}/${taskId}`, { isCompleted });
  return response.data.data;
};
