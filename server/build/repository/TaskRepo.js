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
exports.TaskRepo = void 0;
const Task_1 = require("../model/Task");
// Task repository implementation
class TaskRepo {
    // Save a new task to the database
    save(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Task_1.Task.create({
                    title: task.title,
                    isCompleted: task.isCompleted,
                });
            }
            catch (error) {
                throw new Error("Failed to create task!");
            }
        });
    }
    // Update an existing task
    update(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTask = yield Task_1.Task.findOne({
                    where: {
                        id: task.id,
                    },
                });
                if (!existingTask) {
                    throw new Error("Task not found!");
                }
                existingTask.title = task.title;
                existingTask.isCompleted = task.isCompleted;
                yield existingTask.save();
            }
            catch (error) {
                throw new Error("Failed to update task!");
            }
        });
    }
    // Delete a task by ID
    delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTask = yield Task_1.Task.findOne({
                    where: {
                        id: taskId,
                    },
                });
                if (!existingTask) {
                    throw new Error("Task not found!");
                }
                yield existingTask.destroy();
            }
            catch (error) {
                throw new Error("Failed to delete task!");
            }
        });
    }
    // Retrieve a task by ID
    retrieveById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTask = yield Task_1.Task.findOne({
                    where: {
                        id: taskId,
                    },
                });
                if (!existingTask) {
                    throw new Error("Task not found!");
                }
                return existingTask;
            }
            catch (error) {
                throw new Error("Failed to retrieve task!");
            }
        });
    }
    // Retrieve all tasks from the database
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Task_1.Task.findAll();
            }
            catch (error) {
                throw new Error("Failed to retrieve tasks!");
            }
        });
    }
}
exports.TaskRepo = TaskRepo;
