const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');
const clientsRouter = require('../routes/clients');

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = express();
app.use(express.json());
app.use('/clients', clientsRouter);

describe('Clients API', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /clients', () => {
    it('should create a new client successfully', async () => {
      const mockClient = {
        id: 1,
        name: 'Test Client',
        contact_person: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Test St',
      };

      pool.query.mockResolvedValueOnce({ rows: [mockClient] });

      const response = await request(app)
        .post('/clients')
        .send(mockClient)
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockClient);
    });

    it('should return 500 if there is a server error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/clients')
        .send({
          name: 'Test Client',
          contact_person: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Test St',
        })
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Server error' });
    });
  });

  describe('GET /clients', () => {
    it('should get all clients successfully', async () => {
      const mockClients = [
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
      ];

      pool.query.mockResolvedValue({ rows: mockClients });

      const response = await request(app)
        .get('/clients')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockClients);
    });

    it('should return 500 if there is a server error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/clients')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Server error' });
    });
  });

  describe('GET /clients/:id', () => {
    it('should get a specific client successfully', async () => {
      const mockClient = { id: 1, name: 'Test Client' };

      pool.query.mockResolvedValue({ rows: [mockClient] });

      const response = await request(app)
        .get('/clients/1')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockClient);
    });

    it('should return 404 if client is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .get('/clients/999')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Client not found' });
    });
  });

  describe('PUT /clients/:id', () => {
    it('should update a client successfully', async () => {
      const mockUpdatedClient = {
        id: 1,
        name: 'Updated Client',
        contact_person: 'Jane Doe',
        email: 'jane@example.com',
        phone: '9876543210',
        address: '456 Update St',
      };

      pool.query.mockResolvedValue({ rows: [mockUpdatedClient] });

      const response = await request(app)
        .put('/clients/1')
        .send(mockUpdatedClient)
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUpdatedClient);
    });

    it('should return 404 if client to update is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .put('/clients/999')
        .send({ name: 'Updated Client' })
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Client not found' });
    });
  });

  describe('DELETE /clients/:id', () => {
    it('should delete a client successfully', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

      const response = await request(app)
        .delete('/clients/1')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Client deleted successfully' });
    });

    it('should return 404 if client to delete is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .delete('/clients/999')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Client not found' });
    });
  });
});
