const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const verifyToken = require('../middleware/verifyToken');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create inventory item
router.post('/', verifyToken, async (req, res) => {
  try {
    const { item_name, description, quantity, unit, reorder_level } = req.body;
    const newItem = await pool.query(
      'INSERT INTO inventory (item_name, description, quantity, unit, reorder_level) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [item_name, description, quantity, unit, reorder_level]
    );
    res.status(201).json(newItem.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all inventory items
router.get('/', verifyToken, async (req, res) => {
  try {
    const allItems = await pool.query('SELECT * FROM inventory');
    res.json(allItems.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single inventory item
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const item = await pool.query('SELECT * FROM inventory WHERE id = $1', [id]);
    if (item.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update inventory item
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, description, quantity, unit, reorder_level } = req.body;
    const updatedItem = await pool.query(
      'UPDATE inventory SET item_name = $1, description = $2, quantity = $3, unit = $4, reorder_level = $5 WHERE id = $6 RETURNING *',
      [item_name, description, quantity, unit, reorder_level, id]
    );
    if (updatedItem.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete inventory item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *', [id]);
    if (deletedItem.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
