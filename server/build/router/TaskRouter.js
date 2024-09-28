"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = __importDefault(require("../controller/TaskController"));
// Import task validation schemas if needed
class TaskRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("", 
        // validate(createTaskSchema),
        TaskController_1.default.create); // Create a new task
        this.router.patch("/:id", 
        //  validate(updateTaskSchema), // validate base on Task shema requirements
        TaskController_1.default.update); // Update a task
        this.router.delete("/:id", TaskController_1.default.delete); // Delete a task
        this.router.get("", TaskController_1.default.findAll); // Get all tasks
        this.router.get("/:id", TaskController_1.default.findById); // Get a task by ID
    }
}
exports.default = new TaskRoutes().router;
