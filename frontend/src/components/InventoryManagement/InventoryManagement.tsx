import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack } from '@chakra-ui/react';

const InventoryManagement: React.FC = () => {
  // Mock data for demonstration
  const inventoryItems = [
    { id: 1, name: 'Vinyl Sheets', quantity: 500, unit: 'sheets', reorderLevel: 100 },
    { id: 2, name: 'Ink Cartridges', quantity: 50, unit: 'pieces', reorderLevel: 10 },
  ];

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Inventory Management</Heading>
      <VStack spacing={4} align="stretch">
        <Button colorScheme="blue" alignSelf="flex-start">Add New Item</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Unit</Th>
              <Th>Reorder Level</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventoryItems.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.unit}</Td>
                <Td>{item.reorderLevel}</Td>
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

export default InventoryManagement;
