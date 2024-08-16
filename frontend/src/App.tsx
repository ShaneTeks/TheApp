// TODO: Install react-router-dom package using: npm install react-router-dom
import React from 'react';
import { ChakraProvider, Box, VStack, HStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import ClientManagement from './components/ClientManagement/ClientManagement';
import JobManagement from './components/JobManagement/JobManagement';
import MachineryTracking from './components/MachineryTracking/MachineryTracking';
import InventoryManagement from './components/InventoryManagement/InventoryManagement';
import ChatInterface from './components/ChatInterface/ChatInterface';
import { AppProvider, useAppContext } from './context/AppContext';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <BrowserRouter>
          <Box minHeight="100vh">
            <HStack spacing={0} align="stretch">
              {/* Sidebar/Navigation placeholder */}
              <Box width="250px" bg="gray.100" p={4}>
                {/* Navigation components will go here */}
              </Box>

              {/* Main content area */}
              <VStack flex={1} p={4} align="stretch">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                  <Route path="/client-management" element={<PrivateRoute element={<ClientManagement />} />} />
                  <Route path="/job-management" element={<PrivateRoute element={<JobManagement />} />} />
                  <Route path="/machinery-tracking" element={<PrivateRoute element={<MachineryTracking />} />} />
                  <Route path="/inventory-management" element={<PrivateRoute element={<InventoryManagement />} />} />
                  <Route path="/chat" element={<PrivateRoute element={<ChatInterface />} />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </VStack>
            </HStack>
          </Box>
        </BrowserRouter>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
