import { Request, Response } from "express";
import { Task } from "../model/Task";
import { TaskRepo } from "../repository/TaskRepo";

/* 
TaskController have create, update, delete, findById, findAll, updateToggle and updateTitle functions
These functions called in the routing according to route parameters.
Response object is defined in the taskContoller consist of status, message and data converted to json
Since the server runs on http://localhost:4000 we can see json api responeses at
http://localhost:4000/api/v01/task
http://localhost:4000/api/v01/task/[id]
Note that data array or object are defined in TaskRepo 
*/

class TaskController {
  // Create a new task
  async create(req: Request, res: Response) {
    try {
      const newTask = new Task(); // Create a new task
      newTask.title = req.body.title; // Accessing title from the request body
      newTask.isCompleted = req.body.isCompleted || false; // Default to false if not provided

      await new TaskRepo().save(newTask);

      res.status(201).json({
        status: "Created!", // status code 201 creates status: "created"
        message: "Successfully created task!", /// status code 201 creates message
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  // Delete a task
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]); // get the id from request parameters
      await new TaskRepo().delete(id); // create a new instance to go and delete it

      res.status(200).json({
        status: "Ok!", // success code
        message: "Successfully deleted task!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  // Find a task by ID
  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const task = await new TaskRepo().retrieveById(id); // new instance of TaskRepo created on to go and access its method

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched task by ID!",
        data: task,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  // Find all tasks
  async findAll(req: Request, res: Response) {
    try {
      const tasks = await new TaskRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all tasks!",
        data: tasks,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  // Update a task
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const updatedTask = new Task();

      updatedTask.id = id;
      updatedTask.title = req.body.title; // Accessing title from the request body
      updatedTask.isCompleted = req.body.isCompleted; // Accessing isCompleted from the request body

      await new TaskRepo().update(updatedTask);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated task!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  // Update toggle checkbox
  async updateToggle(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const title = req.params["title"];
      const updatedTask = new Task();

      updatedTask.id = id;
      updatedTask.title = title; // Accessing title from the request body
      updatedTask.isCompleted = req.body.isCompleted; // Accessing isCompleted from the request body

      await new TaskRepo().updateIsCompleted(updatedTask);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated task!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  // Update title
  async updateTitle(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const isCompleted = req.params["isCompleted"];
      const updatedTask = new Task();

      updatedTask.id = id;
      updatedTask.title = req.body.title; // Accessing title from the request body
      updatedTask.isCompleted = !!Number(isCompleted); // Accessing isCompleted from the request body

      await new TaskRepo().updateTitle(updatedTask);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated task!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new TaskController();
