import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.0.1:3001/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Authentication
export const login = (username: string, password: string) =>
  api.post('/users/login', { username, password });

export const signup = (userData: any) =>
  api.post('/users/signup', userData);

export const getProfile = () =>
  api.get('/users/profile');

// Clients
export const getClients = () =>
  api.get('/clients');

export const getClient = (id: number) =>
  api.get(`/clients/${id}`);

export const createClient = (clientData: any) =>
  api.post('/clients', clientData);

export const updateClient = (id: number, clientData: any) =>
  api.put(`/clients/${id}`, clientData);

export const deleteClient = (id: number) =>
  api.delete(`/clients/${id}`);

// Jobs
export const getJobs = () =>
  api.get('/jobs');

export const getJob = (id: number) =>
  api.get(`/jobs/${id}`);

export const createJob = (jobData: any) =>
  api.post('/jobs', jobData);

export const updateJob = (id: number, jobData: any) =>
  api.put(`/jobs/${id}`, jobData);

export const deleteJob = (id: number) =>
  api.delete(`/jobs/${id}`);

// Machinery
export const getMachinery = () =>
  api.get('/machinery');

export const getMachine = (id: number) =>
  api.get(`/machinery/${id}`);

export const createMachine = (machineData: any) =>
  api.post('/machinery', machineData);

export const updateMachine = (id: number, machineData: any) =>
  api.put(`/machinery/${id}`, machineData);

export const deleteMachine = (id: number) =>
  api.delete(`/machinery/${id}`);

// Inventory
export const getInventory = () =>
  api.get('/inventory');

export const getInventoryItem = (id: number) =>
  api.get(`/inventory/${id}`);

export const createInventoryItem = (itemData: any) =>
  api.post('/inventory', itemData);

export const updateInventoryItem = (id: number, itemData: any) =>
  api.put(`/inventory/${id}`, itemData);

export const deleteInventoryItem = (id: number) =>
  api.delete(`/inventory/${id}`);

export default api;
