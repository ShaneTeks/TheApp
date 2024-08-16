import React from 'react';
import { Box, Heading, Button, HStack, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Dashboard</Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h2" size="lg" mb={2}>Client Management</Heading>
          <Button as={RouterLink} to="/client-management" colorScheme="blue">View Clients</Button>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>Job Management</Heading>
          <Button as={RouterLink} to="/job-management" colorScheme="green">View Jobs</Button>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>Machinery Tracking</Heading>
          <Button as={RouterLink} to="/machinery-tracking" colorScheme="purple">View Machinery</Button>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>Inventory Management</Heading>
          <Button as={RouterLink} to="/inventory-management" colorScheme="orange">View Inventory</Button>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>Chat</Heading>
          <Button as={RouterLink} to="/chat" colorScheme="pink">Open Chat</Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Dashboard;
