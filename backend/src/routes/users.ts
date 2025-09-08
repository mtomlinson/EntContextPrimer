import { Router } from 'express';
import db from '../db/connection';

const router = Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await db('users').select('*');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const { email, team_id } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    try {
        const [id] = await db('users').insert({ email, team_id });
        const newUser = await db('users').where({ id }).first();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// GET a single user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db('users').where({ id }).first();
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// PUT (update) a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, team_id } = req.body;
    try {
        const count = await db('users').where({ id }).update({ email, team_id });
        if (count > 0) {
            const updatedUser = await db('users').where({ id }).first();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await db('users').where({ id }).del();
        if (count > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// GET all user contexts
router.get('/:userId/context', async (req, res) => {
    const { userId } = req.params;
    try {
        const userContexts = await db('individual_context').where({ user_id: userId });
        res.json(userContexts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching individual context', error });
    }
});

// POST a new user context
router.post('/:userId/context', async (req, res) => {
    const { userId } = req.params;
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }

    try {
        // Check if user exists
        const user = await db('users').where({ id: userId }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const [id] = await db('individual_context').insert({
            user_id: userId,
            context: JSON.stringify(context)
        });

        const newContext = await db('individual_context').where({ id }).first();
        res.status(201).json(newContext);

    } catch (error) {
        res.status(500).json({ message: 'Error creating individual context', error });
    }
});

// PUT (update) a user context
router.put('/:userId/context/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }

    try {
        const count = await db('individual_context').where({ id: contextId }).update({
            context: JSON.stringify(context),
            updated_at: new Date()
        });

        if (count > 0) {
            const updatedContext = await db('individual_context').where({ id: contextId }).first();
            res.json(updatedContext);
        } else {
            res.status(404).json({ message: 'Individual context not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating individual context', error });
    }
});

// DELETE a user context
router.delete('/:userId/context/:contextId', async (req, res) => {
    const { contextId } = req.params;
    try {
        const count = await db('individual_context').where({ id: contextId }).del();
        if (count > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Individual context not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting individual context', error });
    }
});

export default router;
