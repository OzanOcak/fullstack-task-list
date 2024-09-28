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
const Note_1 = require("../model/Note"); // Import the Note model
const NoteRepo_1 = require("../repository/NoteRepo"); // Import the Note repository
class NoteController {
    // Create a new note
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_note = new Note_1.Note(); // Create a new note instance
                new_note.name = req.body.name; // Set name from request body
                new_note.description = req.body.description; // Set description from request body
                yield new NoteRepo_1.NoteRepo().save(new_note); // Save the new note
                res.status(201).json({
                    status: "Created!",
                    message: "Successfully created note!", // Respond with success message
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!", // Handle server error
                });
            }
        });
    }
    // Delete a note by ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]); // Parse ID from request parameters
                yield new NoteRepo_1.NoteRepo().delete(id); // Delete the note
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully deleted note!", // Respond with success message
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!", // Handle server error
                });
            }
        });
    }
    // Find a note by ID
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]); // Parse ID from request parameters
                const new_note = yield new NoteRepo_1.NoteRepo().retrieveById(id); // Retrieve the note
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully fetched note by id!", // Respond with the note data
                    data: new_note,
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!", // Handle server error
                });
            }
        });
    }
    // Find all notes
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_note = yield new NoteRepo_1.NoteRepo().retrieveAll(); // Retrieve all notes
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully fetched all note data!",
                    data: new_note, // Respond with all notes data
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!", // Handle server error
                });
            }
        });
    }
    // update a note
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]); // Parse ID from request parameters
                const new_note = new Note_1.Note(); // Create a new note instance
                new_note.id = id;
                new_note.name = req.body.name; // Set name from request body
                new_note.description = req.body.description; // Set description from request body
                yield new NoteRepo_1.NoteRepo().update(new_note);
                res.status(200).json({
                    status: "Ok!", // Respond with success message
                    message: "Successfully updated note data!",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!", // Handle server error
                    message: "Internal Server Error!",
                });
            }
        });
    }
}
exports.default = new NoteController();
