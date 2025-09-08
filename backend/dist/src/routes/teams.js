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
// GET all teams
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield (0, connection_1.default)('teams').select('*');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
}));
// POST a new team
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Team name is required.' });
    }
    try {
        const [id] = yield (0, connection_1.default)('teams').insert({ name });
        const newTeam = yield (0, connection_1.default)('teams').where({ id }).first();
        res.status(201).json(newTeam);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
}));
// GET a single team
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const team = yield (0, connection_1.default)('teams').where({ id }).first();
        if (team) {
            res.json(team);
        }
        else {
            res.status(404).json({ message: 'Team not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching team', error });
    }
}));
// PUT (update) a team
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Team name is required.' });
    }
    try {
        const count = yield (0, connection_1.default)('teams').where({ id }).update({ name });
        if (count > 0) {
            const updatedTeam = yield (0, connection_1.default)('teams').where({ id }).first();
            res.json(updatedTeam);
        }
        else {
            res.status(404).json({ message: 'Team not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating team', error });
    }
}));
// DELETE a team
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const count = yield (0, connection_1.default)('teams').where({ id }).del();
        if (count > 0) {
            res.status(204).send(); // No Content
        }
        else {
            res.status(404).json({ message: 'Team not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
}));
// GET all team contexts
router.get('/:teamId/context', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    try {
        const teamContexts = yield (0, connection_1.default)('team_context').where({ team_id: teamId });
        res.json(teamContexts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching team context', error });
    }
}));
// POST a new team context
router.post('/:teamId/context', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    const { context } = req.body;
    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }
    try {
        // Check if team exists
        const team = yield (0, connection_1.default)('teams').where({ id: teamId }).first();
        if (!team) {
            return res.status(404).json({ message: 'Team not found.' });
        }
        const [id] = yield (0, connection_1.default)('team_context').insert({
            team_id: teamId,
            context: JSON.stringify(context)
        });
        const newContext = yield (0, connection_1.default)('team_context').where({ id }).first();
        res.status(201).json(newContext);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating team context', error });
    }
}));
// PUT (update) a team context
router.put('/:teamId/context/:contextId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contextId } = req.params;
    const { context } = req.body;
    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }
    try {
        const count = yield (0, connection_1.default)('team_context').where({ id: contextId }).update({
            context: JSON.stringify(context),
            updated_at: new Date()
        });
        if (count > 0) {
            const updatedContext = yield (0, connection_1.default)('team_context').where({ id: contextId }).first();
            res.json(updatedContext);
        }
        else {
            res.status(404).json({ message: 'Team context not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating team context', error });
    }
}));
// DELETE a team context
router.delete('/:teamId/context/:contextId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contextId } = req.params;
    try {
        const count = yield (0, connection_1.default)('team_context').where({ id: contextId }).del();
        if (count > 0) {
            res.status(204).send(); // No Content
        }
        else {
            res.status(404).json({ message: 'Team context not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting team context', error });
    }
}));
exports.default = router;
