"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
// Define the Task model
let Task = class Task extends sequelize_typescript_1.Model {
};
exports.Task = Task;
// Constants for table and column names
Task.TASK_TABLE_NAME = "task";
Task.TASK_ID = "id";
Task.TASK_TITLE = "title";
Task.TASK_IS_COMPLETED = "isCompleted";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Task.TASK_ID,
    }),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        field: Task.TASK_TITLE,
    }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false, // Default value for new tasks
        field: Task.TASK_IS_COMPLETED,
    }),
    __metadata("design:type", Boolean)
], Task.prototype, "isCompleted", void 0);
exports.Task = Task = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Task.TASK_TABLE_NAME,
    })
], Task);
