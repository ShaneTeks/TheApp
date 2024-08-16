const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const verifyToken = require('../tests/mocks/verifyToken');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a new client
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, contact_person, email, phone, address } = req.body;
    const newClient = await pool.query(
      'INSERT INTO clients (name, contact_person, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, contact_person, email, phone, address]
    );
    res.status(201).json(newClient.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all clients
router.get('/', verifyToken, async (req, res) => {
  try {
    const clients = await pool.query('SELECT * FROM clients');
    res.json(clients.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific client
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
    if (client.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a client
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact_person, email, phone, address } = req.body;
    const updatedClient = await pool.query(
      'UPDATE clients SET name = $1, contact_person = $2, email = $3, phone = $4, address = $5 WHERE id = $6 RETURNING *',
      [name, contact_person, email, phone, address, id]
    );
    if (updatedClient.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(updatedClient.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a client
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    if (deletedClient.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
