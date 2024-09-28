import { Task } from "../model/Task";

/* Interface defining the task repository methods to be called  in the controller 
along with status code and message */
interface ITaskRepo {
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  updateIsCompleted(task: Task): Promise<void>;
  updateTitle(task: Task): Promise<void>;
  delete(taskId: number): Promise<void>;
  retrieveById(taskId: number): Promise<Task>;
  retrieveAll(): Promise<Task[]>;
}

// Task repository implementation
export class TaskRepo implements ITaskRepo {
  // Save a new task to the database
  async save(task: Task): Promise<void> {
    try {
      await Task.create({
        title: task.title,
        isCompleted: task.isCompleted,
      });
    } catch (error) {
      throw new Error("Failed to create task!");
    }
  }

  // Update an existing task
  async update(task: Task): Promise<void> {
    try {
      const existingTask = await Task.findOne({
        where: {
          id: task.id,
        },
      });
      if (!existingTask) {
        throw new Error("Task not found!");
      }
      existingTask.title = task.title;
      existingTask.isCompleted = task.isCompleted;

      await existingTask.save();
    } catch (error) {
      throw new Error("Failed to update task!");
    }
  }

  // Update isCompleted in existing task
  async updateIsCompleted(task: Task): Promise<void> {
    try {
      const existingTask = await Task.findOne({
        where: {
          id: task.id,
        },
      });
      if (!existingTask) {
        throw new Error("Task not found!");
      }
      existingTask.title = existingTask.title;
      existingTask.isCompleted = task.isCompleted;

      await existingTask.save();
    } catch (error) {
      throw new Error("Failed to update task!");
    }
  }

  // Update title in existing task
  async updateTitle(task: Task): Promise<void> {
    try {
      const existingTask = await Task.findOne({
        where: {
          id: task.id,
        },
      });
      if (!existingTask) {
        throw new Error("Task not found!");
      }
      existingTask.title = task.title;
      existingTask.isCompleted = existingTask.isCompleted;

      await existingTask.save();
    } catch (error) {
      throw new Error("Failed to update task!");
    }
  }

  // Delete a task by ID
  async delete(taskId: number): Promise<void> {
    try {
      const existingTask = await Task.findOne({
        where: {
          id: taskId,
        },
      });
      if (!existingTask) {
        throw new Error("Task not found!");
      }

      await existingTask.destroy();
    } catch (error) {
      throw new Error("Failed to delete task!");
    }
  }

  // Retrieve a task by ID
  async retrieveById(taskId: number): Promise<Task> {
    try {
      const existingTask = await Task.findOne({
        where: {
          id: taskId,
        },
      });
      if (!existingTask) {
        throw new Error("Task not found!");
      }
      return existingTask;
    } catch (error) {
      throw new Error("Failed to retrieve task!");
    }
  }

  // Retrieve all tasks from the database
  async retrieveAll(): Promise<Task[]> {
    try {
      return await Task.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve tasks!");
    }
  }
}
