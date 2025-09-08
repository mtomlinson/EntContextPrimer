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
const express_1 = require("express");
const connection_1 = __importDefault(require("../db/connection"));
const router = (0, express_1.Router)();
// GET all users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, connection_1.default)('users').select('*');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}));
// POST a new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, team_id } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    try {
        const [id] = yield (0, connection_1.default)('users').insert({ email, team_id });
        const newUser = yield (0, connection_1.default)('users').where({ id }).first();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}));
// GET a single user
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, connection_1.default)('users').where({ id }).first();
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}));
// PUT (update) a user
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, team_id } = req.body;
    try {
        const count = yield (0, connection_1.default)('users').where({ id }).update({ email, team_id });
        if (count > 0) {
            const updatedUser = yield (0, connection_1.default)('users').where({ id }).first();
            res.json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}));
// DELETE a user
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const count = yield (0, connection_1.default)('users').where({ id }).del();
        if (count > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}));
// GET all user contexts
router.get('/:userId/context', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userContexts = yield (0, connection_1.default)('individual_context').where({ user_id: userId });
        res.json(userContexts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching individual context', error });
    }
}));
// POST a new user context
router.post('/:userId/context', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { context } = req.body;
    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }
    try {
        // Check if user exists
        const user = yield (0, connection_1.default)('users').where({ id: userId }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const [id] = yield (0, connection_1.default)('individual_context').insert({
            user_id: userId,
            context: JSON.stringify(context)
        });
        const newContext = yield (0, connection_1.default)('individual_context').where({ id }).first();
        res.status(201).json(newContext);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating individual context', error });
    }
}));
// PUT (update) a user context
router.put('/:userId/context/:contextId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contextId } = req.params;
    const { context } = req.body;
    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }
    try {
        const count = yield (0, connection_1.default)('individual_context').where({ id: contextId }).update({
            context: JSON.stringify(context),
            updated_at: new Date()
        });
        if (count > 0) {
            const updatedContext = yield (0, connection_1.default)('individual_context').where({ id: contextId }).first();
            res.json(updatedContext);
        }
        else {
            res.status(404).json({ message: 'Individual context not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating individual context', error });
    }
}));
// DELETE a user context
router.delete('/:userId/context/:contextId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contextId } = req.params;
    try {
        const count = yield (0, connection_1.default)('individual_context').where({ id: contextId }).del();
        if (count > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Individual context not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting individual context', error });
    }
}));
exports.default = router;
