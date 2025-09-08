import { Router } from 'express';
import db from '../db/connection';

const router = Router();

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await db('teams').select('*');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

// POST a new team
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Team name is required.' });
  }
  try {
    const [id] = await db('teams').insert({ name });
    const newTeam = await db('teams').where({ id }).first();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
});

// GET a single team
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const team = await db('teams').where({ id }).first();
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ message: 'Team not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team', error });
    }
});

// PUT (update) a team
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Team name is required.' });
    }
    try {
        const count = await db('teams').where({ id }).update({ name });
        if (count > 0) {
            const updatedTeam = await db('teams').where({ id }).first();
            res.json(updatedTeam);
        } else {
            res.status(404).json({ message: 'Team not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error });
    }
});

// DELETE a team
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await db('teams').where({ id }).del();
        if (count > 0) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ message: 'Team not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
});

// GET all team contexts
router.get('/:teamId/context', async (req, res) => {
    const { teamId } = req.params;
    try {
        const teamContexts = await db('team_context').where({ team_id: teamId });
        res.json(teamContexts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team context', error });
    }
});

// POST a new team context
router.post('/:teamId/context', async (req, res) => {
    const { teamId } = req.params;
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }

    try {
        // Check if team exists
        const team = await db('teams').where({ id: teamId }).first();
        if (!team) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        const [id] = await db('team_context').insert({
            team_id: teamId,
            context: JSON.stringify(context)
        });

        const newContext = await db('team_context').where({ id }).first();
        res.status(201).json(newContext);

    } catch (error) {
        res.status(500).json({ message: 'Error creating team context', error });
    }
});

// PUT (update) a team context
router.put('/:teamId/context/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }

    try {
        const count = await db('team_context').where({ id: contextId }).update({
            context: JSON.stringify(context),
            updated_at: new Date()
        });

        if (count > 0) {
            const updatedContext = await db('team_context').where({ id: contextId }).first();
            res.json(updatedContext);
        } else {
            res.status(404).json({ message: 'Team context not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating team context', error });
    }
});

// DELETE a team context
router.delete('/:teamId/context/:contextId', async (req, res) => {
    const { contextId } = req.params;
    try {
        const count = await db('team_context').where({ id: contextId }).del();
        if (count > 0) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ message: 'Team context not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team context', error });
    }
});

export default router;
