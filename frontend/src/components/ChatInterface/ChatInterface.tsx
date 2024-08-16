import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Input, Button, Text, Heading } from '@chakra-ui/react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Adjust the URL as needed

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setChatHistory(prevHistory => [...prevHistory, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Chat Interface</Heading>
      <VStack spacing={4} align="stretch" height="70vh">
        <Box flex={1} overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
          {chatHistory.map((msg, index) => (
            <Text key={index}>{msg}</Text>
          ))}
        </Box>
        <HStack>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatInterface;
