import { Router } from "express";
import TaskController from "../controller/TaskController";
import validate from "../helper/validate";
import { createTaskSchema, updateTaskSchema } from "../schema/TaskSchema";
// Import task validation schemas if needed

// express router gets 2 args;  url extension and a function in controller to update database
class TaskRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post(
      "",
      // validate(createTaskSchema),
      TaskController.create
    ); // Create a new task
    this.router.patch(
      "/:id",
      //  validate(updateTaskSchema), // validate base on Task shema requirements
      TaskController.update
    ); // Update a task
    this.router.patch(
      "/:id",
      //  validate(updateTaskSchema), // validate base on Task shema requirements
      TaskController.updateTitle
    ); // Update a task
    this.router.patch(
      "/:id",
      //  validate(updateTaskSchema), // validate base on Task shema requirements
      TaskController.updateToggle
    ); // Update a task
    this.router.delete("/:id", TaskController.delete); // Delete a task
    this.router.get("", TaskController.findAll); // Get all tasks
    this.router.get("/:id", TaskController.findById); // Get a task by ID
  }
}

export default new TaskRoutes().router;
