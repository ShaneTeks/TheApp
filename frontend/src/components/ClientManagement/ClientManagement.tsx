import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack } from '@chakra-ui/react';

const ClientManagement: React.FC = () => {
  // Mock data for demonstration
  const clients = [
    { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com' },
    { id: 2, name: 'XYZ Inc', contact: 'Jane Smith', email: 'jane@xyz.com' },
  ];

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Client Management</Heading>
      <VStack spacing={4} align="stretch">
        <Button colorScheme="blue" alignSelf="flex-start">Add New Client</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Contact Person</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client) => (
              <Tr key={client.id}>
                <Td>{client.name}</Td>
                <Td>{client.contact}</Td>
                <Td>{client.email}</Td>
                <Td>
                  <Button size="sm" colorScheme="teal" mr={2}>Edit</Button>
                  <Button size="sm" colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default ClientManagement;
