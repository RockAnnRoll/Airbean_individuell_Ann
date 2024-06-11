//rutthanteraren för admin-funktionaliteten

import express from 'express';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../models/menu.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/menu', requireAdmin, async (req, res) => {
  const menu = await getMenu();
  res.json(menu);
});

router.post('/menu', requireAdmin, async (req, res) => {
  const { id, title, desc, price } = req.body;
  if (!id || !title || !desc || !price) {
    return res.status(400).send('All fields (id, title, desc, price) are required');
  }
  const newItem = { id, title, desc, price, createdAt: new Date().toISOString() };
  const addedItem = await addMenuItem(newItem);
  res.status(201).json(addedItem);
});

router.put('/menu/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  updates.modifiedAt = new Date().toISOString();
  const updatedItem = await updateMenuItem(id, updates);
  res.json(updatedItem);
});

router.delete('/menu/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const deletedItem = await deleteMenuItem(id);
  if (deletedItem) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).send('Item not found');
  }
});

export default router;

