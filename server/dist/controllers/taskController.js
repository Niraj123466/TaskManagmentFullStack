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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.updateTodoStatus = exports.getTodos = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, priority, status } = req.body;
        const todo = new todo_1.default({ title, user: req.user._id, description, priority, status });
        yield todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find({ user: req.user._id });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});
exports.getTodos = getTodos;
const updateTodoStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const todo = yield todo_1.default.findOneAndUpdate({ _id: id, user: req.user._id }, { status }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});
exports.updateTodoStatus = updateTodoStatus;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todo_1.default.findOneAndDelete({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // The ID of the todo to update
        const { title, description, priority, status } = req.body; // Fields to update
        // Find the todo by ID and update it
        const todo = yield todo_1.default.findOneAndUpdate({ _id: id, user: req.user._id }, // Match todo by its ID and the current user
        { title, description, priority, status }, // Fields to update
        { new: true, runValidators: true } // Return the updated todo and run validation
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo); // Respond with the updated todo
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});
exports.updateTodo = updateTodo;
