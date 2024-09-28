"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../model/Task");
const TaskRepo_1 = require("../repository/TaskRepo");
class TaskController {
    // Create a new task
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTask = new Task_1.Task();
                newTask.title = req.body.title; // Accessing title from the request body
                newTask.isCompleted = req.body.isCompleted || false; // Default to false if not provided
                yield new TaskRepo_1.TaskRepo().save(newTask);
                res.status(201).json({
                    status: "Created!",
                    message: "Successfully created task!",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    // Delete a task
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                yield new TaskRepo_1.TaskRepo().delete(id);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully deleted task!",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    // Find a task by ID
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const task = yield new TaskRepo_1.TaskRepo().retrieveById(id);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully fetched task by ID!",
                    data: task,
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    // Find all tasks
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield new TaskRepo_1.TaskRepo().retrieveAll();
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully fetched all tasks!",
                    data: tasks,
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    // Update a task
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const updatedTask = new Task_1.Task();
                updatedTask.id = id;
                updatedTask.title = req.body.title; // Accessing title from the request body
                updatedTask.isCompleted = req.body.isCompleted; // Accessing isCompleted from the request body
                yield new TaskRepo_1.TaskRepo().update(updatedTask);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully updated task!",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
}
exports.default = new TaskController();
