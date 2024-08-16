import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack } from '@chakra-ui/react';

const JobManagement: React.FC = () => {
  // Mock data for demonstration
  const jobs = [
    { id: 1, title: 'Billboard Installation', client: 'Acme Corp', status: 'In Progress', startDate: '2023-05-01' },
    { id: 2, title: 'Neon Sign Repair', client: 'XYZ Inc', status: 'Pending', startDate: '2023-05-15' },
  ];

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Job Management</Heading>
      <VStack spacing={4} align="stretch">
        <Button colorScheme="blue" alignSelf="flex-start">Add New Job</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Client</Th>
              <Th>Status</Th>
              <Th>Start Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map((job) => (
              <Tr key={job.id}>
                <Td>{job.title}</Td>
                <Td>{job.client}</Td>
                <Td>{job.status}</Td>
                <Td>{job.startDate}</Td>
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

export default JobManagement;
