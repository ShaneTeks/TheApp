const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');
const jobsRouter = require('../routes/jobs');

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = express();
app.use(express.json());
app.use('/jobs', jobsRouter);

describe('Jobs API', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /jobs', () => {
    it('should create a new job successfully', async () => {
      const mockJob = {
        id: 1,
        client_id: 1,
        title: 'Test Job',
        description: 'A test job',
        status: 'pending',
        start_date: '2023-05-01',
        end_date: '2023-05-31',
        machine_id: 1,
      };

      const mockMaterials = [
        { id: 1, quantity_used: 5 },
        { id: 2, quantity_used: 10 },
      ];

      pool.query
        .mockResolvedValueOnce({ rows: [mockJob] })
        .mockResolvedValue({ rows: [] });

      const response = await request(app)
        .post('/jobs')
        .send({
          ...mockJob,
          materials_used: mockMaterials,
        })
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockJob);
      expect(pool.query).toHaveBeenCalledTimes(3);
    });

    it('should return 500 if there is a server error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/jobs')
        .send({
          client_id: 1,
          title: 'Test Job',
          description: 'A test job',
          status: 'pending',
          start_date: '2023-05-01',
          end_date: '2023-05-31',
          machine_id: 1,
          materials_used: [],
        })
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Server error' });
    });
  });

  describe('GET /jobs', () => {
    it('should get all jobs successfully', async () => {
      const mockJobs = [
        { id: 1, title: 'Job 1' },
        { id: 2, title: 'Job 2' },
      ];

      pool.query.mockResolvedValue({ rows: mockJobs });

      const response = await request(app)
        .get('/jobs')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockJobs);
    });
  });

  describe('GET /jobs/:id', () => {
    it('should get a specific job successfully', async () => {
      const mockJob = { id: 1, title: 'Test Job' };

      pool.query.mockResolvedValue({ rows: [mockJob] });

      const response = await request(app)
        .get('/jobs/1')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockJob);
    });

    it('should return 404 if job is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .get('/jobs/999')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Job not found' });
    });
  });

  describe('PUT /jobs/:id', () => {
    it('should update a job successfully', async () => {
      const mockUpdatedJob = {
        id: 1,
        title: 'Updated Job',
        description: 'Updated description',
      };

      pool.query.mockResolvedValue({ rows: [mockUpdatedJob] });

      const response = await request(app)
        .put('/jobs/1')
        .send(mockUpdatedJob)
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUpdatedJob);
    });

    it('should return 404 if job to update is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .put('/jobs/999')
        .send({ title: 'Updated Job' })
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Job not found' });
    });
  });

  describe('DELETE /jobs/:id', () => {
    it('should delete a job successfully', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

      const response = await request(app)
        .delete('/jobs/1')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Job deleted successfully' });
    });

    it('should return 404 if job to delete is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .delete('/jobs/999')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Job not found' });
    });
  });
});
