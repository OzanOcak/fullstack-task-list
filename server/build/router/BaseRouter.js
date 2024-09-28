"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import Router from Express
// Abstract class for base router
class BaseRoutes {
    constructor() {
        this.router = (0, express_1.Router)(); // Router instance
        this.routes(); // Call the routes method
    }
}
exports.default = BaseRoutes;
