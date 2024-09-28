"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import the CORS middleware
const database_1 = __importDefault(require("./config/database"));
const TaskRouter_1 = __importDefault(require("./router/TaskRouter")); // Import the TaskRouter
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use((0, cors_1.default)()); // Enable CORS for all routes
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Welcome home");
        });
        this.app.use("/api/v01/task", TaskRouter_1.default); // Use TaskRouter for task routes
    }
}
const port = 4000; // Ensure this matches your backend port
const app = new App().app;
app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
});
