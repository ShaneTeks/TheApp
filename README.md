# Signage Web Application

## Overview

This application facilitates the management of clients, jobs, tasks, users, inventory, and machinery for a signage company, designed to run offline on a local network. It incorporates real-time chat functionality and user authentication.

## Technology Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Real-time Communication: Socket.io

## User Guide

### User Authentication

1. **Signup:** Navigate to the signup page, fill in your details, and submit the form to create an account.
2. **Login:** Use your credentials to log in. Successful authentication grants access to the dashboard.

### Dashboard

- Provides an overview of clients, jobs, inventory, and machinery. Basic controls for navigation are included to access detailed management pages.

### Client Management

- Add, update, and remove clients. View detailed client information and manage associated jobs.

### Job Management

- Manage tasks, assign users, and track job completion.

### Machinery Tracking

- Monitor machine status. Includes CNC Routers, CO2 Lasers, etc. Logs job history and material usage.

### Inventory Management

- Track available materials and log changes in inventory levels for job allocation.

### Real-time Chat

- Engage in real-time communication with other logged-in users.

## API Documentation

- [GET] `/api/clients`: Fetch all clients
- [POST] `/api/clients`: Create a new client
- [PUT] `/api/clients/:id`: Update client details
- [DELETE] `/api/clients/:id`: Remove a client

- [GET] `/api/jobs`: Fetch all jobs or filter by status
- [POST] `/api/jobs`: Create a new job entry
- [PUT] `/api/jobs/:id`: Update job details
- [DELETE] `/api/jobs/:id`: Delete a job record

- [GET] `/api/machinery`: Fetch all machinery records
- [POST] `/api/machinery`: Create machinery data entry
- [PUT] `/api/machinery/:id`: Update machinery details
- [DELETE] `/api/machinery/:id`: Remove a machinery record

- [GET] `/api/inventory`: Fetch all inventory items
- [POST] `/api/inventory`: Create new inventory item
- [PUT] `/api/inventory/:id`: Update inventory item details
- [DELETE] `/api/inventory/:id`: Remove an inventory item

- [GET] `/api/users`: Fetch all users (admin only)
- [POST] `/api/users`: Create a new user (signup)
- [PUT] `/api/users/:id`: Update user details
- [DELETE] `/api/users/:id`: Remove a user (admin only)

## Deployment Guide

### Prerequisites

- Ensure Node.js, npm, and PostgreSQL are installed.
- Confirm local network IP address (e.g., 192.168.0.1).

### Setup Instructions

1. **Clone the Repository:**
   ```
   git clone <repository-url>
   cd signage-webapp
   ```

2. **Install Dependencies:**
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Database Initialization:**
   Execute SQL schema found in `backend/schema.sql` to set up PostgreSQL.

4. **Environment Configuration:**
   Configure local IP in environment variables (if necessary)

5. **Run the Application:**
   - **Backend:** Navigate to `backend` and run `npm start`.
   - **Frontend:** Navigate to `frontend` and run `npm start`.

6. **Ensure Connectivity:**
   Confirm devices on the local network can reach the application through the host machine's IP.

7. **Technical Support:**
   For installation assistance, provide a detailed setup log for troubleshooting.
