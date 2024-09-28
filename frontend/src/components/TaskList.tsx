import { Task } from "../types";
import TaskListItem from "./TaskListItem";

type TaskListProps = {
  filteredTasks: Task[];
  deleteTask: (taskId: string) => Promise<void>;
  toggleTask: (taskId: string, isCompleted: boolean) => Promise<void>;
  updateTask: (taskId: string, updatedTask: string) => Promise<void>;
};

export default function TaskList({
  filteredTasks,
  deleteTask,
  toggleTask,
  updateTask,
}: TaskListProps) {
  return (
    <div className="task_list">
      <ul className="list-disc pl-5">
        {filteredTasks.length > 0
          ? filteredTasks.map(
              (task: Task) =>
                task && task.id ? ( // Check if task and task.id are valid
                  <li
                    key={task.id}
                    className="text-gray-700 mb-2 py-1 bg-slate-200 list-none rounded-md"
                  >
                    <TaskListItem
                      task={task}
                      deleteTask={deleteTask}
                      toggleTask={toggleTask}
                      updateTask={updateTask}
                    />
                  </li>
                ) : null // Handle the case where task is undefined
            )
          : " -- Ooops, no tasks to show! --"}
      </ul>
    </div>
  );
}
