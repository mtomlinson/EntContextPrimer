import { Router } from 'express';
import db from '../db/connection';

const router = Router();

// GET the company context
router.get('/', async (req, res) => {
  try {
    // There should only be one company context, so we fetch the first one.
    const companyContext = await db('company_context').first();
    if (companyContext) {
      res.json(companyContext);
    } else {
      // If no context is set yet, return a default or an empty object.
      res.status(404).json({ message: 'Company context not set.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company context', error });
  }
});

// PUT (create or update) the company context
router.put('/', async (req, res) => {
  const { context } = req.body;

  if (!context) {
    return res.status(400).json({ message: 'Context data is required.' });
  }

  try {
    const existingContext = await db('company_context').first();

    if (existingContext) {
      // Update existing context
      await db('company_context').where({ id: existingContext.id }).update({
        context: JSON.stringify(context), // Store context as a JSON string
        updated_at: new Date()
      });
    } else {
      // Insert new context
      await db('company_context').insert({
        context: JSON.stringify(context)
      });
    }
    
    const updatedContext = await db('company_context').first();
    res.status(200).json(updatedContext);

  } catch (error) {
    res.status(500).json({ message: 'Error updating company context', error });
  }
});

export default router;
