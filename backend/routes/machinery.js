const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const verifyToken = require('../middleware/verifyToken');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create machinery
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, type, status, last_maintenance_date, next_maintenance_date } = req.body;
    const newMachinery = await pool.query(
      'INSERT INTO machinery (name, type, status, last_maintenance_date, next_maintenance_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, type, status, last_maintenance_date, next_maintenance_date]
    );
    res.status(201).json(newMachinery.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all machinery
router.get('/', verifyToken, async (req, res) => {
  try {
    const allMachinery = await pool.query('SELECT * FROM machinery');
    res.json(allMachinery.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single machinery
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const machinery = await pool.query('SELECT * FROM machinery WHERE id = $1', [id]);
    if (machinery.rows.length === 0) {
      return res.status(404).json({ error: 'Machinery not found' });
    }
    res.json(machinery.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update machinery
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, last_maintenance_date, next_maintenance_date } = req.body;
    const updatedMachinery = await pool.query(
      'UPDATE machinery SET name = $1, type = $2, status = $3, last_maintenance_date = $4, next_maintenance_date = $5 WHERE id = $6 RETURNING *',
      [name, type, status, last_maintenance_date, next_maintenance_date, id]
    );
    if (updatedMachinery.rows.length === 0) {
      return res.status(404).json({ error: 'Machinery not found' });
    }
    res.json(updatedMachinery.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete machinery
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMachinery = await pool.query('DELETE FROM machinery WHERE id = $1 RETURNING *', [id]);
    if (deletedMachinery.rows.length === 0) {
      return res.status(404).json({ error: 'Machinery not found' });
    }
    res.json({ message: 'Machinery deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
