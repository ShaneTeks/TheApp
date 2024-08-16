const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('../routes/users');

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('fake-token'),
  verify: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('Users API', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users/signup', () => {
    it('should create a new user successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'user',
      };

      pool.query
        .mockResolvedValueOnce({ rows: [] }) // User check
        .mockResolvedValueOnce({ rows: [mockUser] }); // Insert new user

      const response = await request(app)
        .post('/users/signup')
        .send({
          username: 'testuser',
          password: 'password123',
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'user',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 400 if user already exists', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // User check

      const response = await request(app)
        .post('/users/signup')
        .send({
          username: 'existinguser',
          password: 'password123',
          email: 'existing@example.com',
          full_name: 'Existing User',
          role: 'user',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Username or email already exists' });
    });
  });

  describe('POST /users/login', () => {
    it('should login user successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password_hash: 'hashedPassword',
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });
      bcrypt.compare.mockResolvedValueOnce(true);

      const response = await request(app)
        .post('/users/login')
        .send({
          username: 'testuser',
          password: 'password123',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token: 'fake-token' });
      expect(response.header.authorization).toBe('fake-token');
    });

    it('should return 400 for invalid credentials', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .post('/users/login')
        .send({
          username: 'nonexistentuser',
          password: 'wrongpassword',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid username or password' });
    });
  });

  describe('GET /users/profile', () => {
    it('should get user profile successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'user',
      };

      jwt.verify.mockReturnValueOnce({ id: 1 });
      pool.query.mockResolvedValueOnce({ rows: [mockUser] });

      const response = await request(app)
        .get('/users/profile')
        .set('Authorization', 'Bearer fake-token');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 401 for missing token', async () => {
      const response = await request(app).get('/users/profile');

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'Access denied' });
    });
  });
});
