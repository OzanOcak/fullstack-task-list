"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteController_1 = __importDefault(require("../controller/NoteController")); // Import the note controller
const validate_1 = __importDefault(require("../helper/validate")); // Import validation middleware
const NoteSchema_1 = require("../schema/NoteSchema"); // Import schemas
const BaseRouter_1 = __importDefault(require("./BaseRouter")); // Import base router
// Class for note-related routes
class NoteRoutes extends BaseRouter_1.default {
    routes() {
        // Route to create a new note with validation
        this.router.post("", (0, validate_1.default)(NoteSchema_1.createNoteSchema), NoteController_1.default.create);
        // Route to update an existing note by ID with validation
        this.router.patch("/:id", (0, validate_1.default)(NoteSchema_1.updateNoteSchema), NoteController_1.default.update);
        // Route to delete a note by ID
        this.router.delete("/:id", NoteController_1.default.delete);
        // Route to fetch all notes
        this.router.get("", NoteController_1.default.findAll);
        // Route to fetch a note by ID
        this.router.get("/:id", NoteController_1.default.findById);
    }
}
exports.default = new NoteRoutes().router;
