const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const verifyToken = require('../tests/mocks/verifyToken');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a new job
router.post('/', verifyToken, async (req, res) => {
  try {
    const { client_id, title, description, status, start_date, end_date, machine_id, materials_used } = req.body;
    const newJob = await pool.query(
      'INSERT INTO jobs (client_id, title, description, status, start_date, end_date, machine_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [client_id, title, description, status, start_date, end_date, machine_id]
    );

    // Track materials used for this job
    for (const material of materials_used) {
      await pool.query(
        'INSERT INTO inventory_usage (job_id, inventory_id, quantity_used) VALUES ($1, $2, $3)',
        [newJob.rows[0].id, material.id, material.quantity_used]
      );
    }

    res.status(201).json(newJob.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all jobs
router.get('/', verifyToken, async (req, res) => {
  try {
    const jobs = await pool.query('SELECT * FROM jobs');
    res.json(jobs.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific job
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const job = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (job.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a job
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, title, description, status, start_date, end_date, machine_id } = req.body;
    const updatedJob = await pool.query(
      'UPDATE jobs SET client_id = $1, title = $2, description = $3, status = $4, start_date = $5, end_date = $6, machine_id = $7 WHERE id = $8 RETURNING *',
      [client_id, title, description, status, start_date, end_date, machine_id, id]
    );
    if (updatedJob.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(updatedJob.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a job
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
    if (deletedJob.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
