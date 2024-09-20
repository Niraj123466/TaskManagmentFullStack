"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.post('/', taskController_1.createTodo);
router.get('/', taskController_1.getTodos);
router.patch('/:id', taskController_1.updateTodoStatus);
router.put('/:id', taskController_1.updateTodo);
router.delete('/:id', taskController_1.deleteTodo);
exports.default = router;
