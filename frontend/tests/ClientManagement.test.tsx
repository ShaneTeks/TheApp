import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientManagement from '../src/components/ClientManagement/ClientManagement';
import * as apiService from '../src/api/apiService';

// Mock the API service
jest.mock('../src/api/apiService');

describe('ClientManagement Component', () => {
  const mockClients = [
    { id: 1, name: 'Acme Corp', contact_person: 'John Doe', email: 'john@acme.com' },
    { id: 2, name: 'XYZ Inc', contact_person: 'Jane Smith', email: 'jane@xyz.com' },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  test('renders client list', async () => {
    (apiService.getClients as jest.Mock).mockResolvedValue({ data: mockClients });

    render(<ClientManagement />);

    await waitFor(() => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('XYZ Inc')).toBeInTheDocument();
    });
  });

  test('adds a new client', async () => {
    const newClient = { id: 3, name: 'New Corp', contact_person: 'New Contact', email: 'new@corp.com' };
    (apiService.createClient as jest.Mock).mockResolvedValue({ data: newClient });
    (apiService.getClients as jest.Mock).mockResolvedValue({ data: [...mockClients, newClient] });

    render(<ClientManagement />);

    fireEvent.click(screen.getByText('Add New Client'));

    // Here you would typically interact with a form, but for simplicity, we'll just check if the API was called
    await waitFor(() => {
      expect(apiService.createClient).toHaveBeenCalled();
    });

    // Check if the new client is rendered
    await waitFor(() => {
      expect(screen.getByText('New Corp')).toBeInTheDocument();
    });
  });

  test('deletes a client', async () => {
    (apiService.getClients as jest.Mock).mockResolvedValue({ data: mockClients });
    (apiService.deleteClient as jest.Mock).mockResolvedValue({});

    render(<ClientManagement />);

    await waitFor(() => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]); // Delete the first client
    });

    await waitFor(() => {
      expect(apiService.deleteClient).toHaveBeenCalledWith(1); // Assuming the first client has id 1
    });

    // Check if the client is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
    });
  });

  // Add more tests for editing clients, error handling, etc.
});
