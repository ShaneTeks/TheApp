import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack } from '@chakra-ui/react';

const MachineryTracking: React.FC = () => {
  // Mock data for demonstration
  const machinery = [
    { id: 1, name: 'Billboard Printer', type: 'Printer', status: 'Operational', lastMaintenance: '2023-04-15', nextMaintenance: '2023-07-15' },
    { id: 2, name: 'Vinyl Cutter', type: 'Cutter', status: 'Under Maintenance', lastMaintenance: '2023-05-01', nextMaintenance: '2023-05-15' },
  ];

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Machinery Tracking</Heading>
      <VStack spacing={4} align="stretch">
        <Button colorScheme="blue" alignSelf="flex-start">Add New Machinery</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Last Maintenance</Th>
              <Th>Next Maintenance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {machinery.map((machine) => (
              <Tr key={machine.id}>
                <Td>{machine.name}</Td>
                <Td>{machine.type}</Td>
                <Td>{machine.status}</Td>
                <Td>{machine.lastMaintenance}</Td>
                <Td>{machine.nextMaintenance}</Td>
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

export default MachineryTracking;
