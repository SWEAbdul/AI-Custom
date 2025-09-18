'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack, TextField, Button } from '@mui/material';

export default function Home() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi, I\'m the HeadStarter Support Agent. How can I assist you today?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const endOfMessagesRef = useRef(null);

    const sendMessage = async () => {
        if (message.trim()) {
            const userMessage = message;
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: userMessage }
            ]);
            setMessage('');

            // Add empty assistant message for streaming
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: '' }
            ]);
            setIsTyping(true);

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userMessage })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let content = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value, { stream: true });
                    content += chunk;
                    
                    // Update the last message (assistant's message) with streaming content
                    setMessages((prevMessages) => {
                        const newMessages = [...prevMessages];
                        newMessages[newMessages.length - 1] = {
                            role: 'assistant',
                            content: content
                        };
                        return newMessages;
                    });
                }
                setIsTyping(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1] = {
                        role: 'assistant',
                        content: 'Sorry, something went wrong. Please try again.'
                    };
                    return newMessages;
                });
                setIsTyping(false);
            }
        }
    };

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 2 }}
        >
            <Stack
                direction="column"
                spacing={2}
                width="600px"
                height="700px"
                border="1px solid black"
                p={2}
                overflow="auto"
                sx={{ bgcolor: 'background.paper' }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        display="flex"
                        justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
                    >
                        <Box
                            bgcolor={msg.role === 'assistant' ? 'white' : 'blue'}
                            color={msg.role === 'assistant' ? 'black' : 'white'}
                            borderRadius={2}
                            p={2}
                            maxWidth="80%"
                            sx={{ wordBreak: 'break-word' }}
                        >
                            {msg.content}
                            {isTyping && index === messages.length - 1 && msg.role === 'assistant' && (
                                <span style={{ opacity: 0.7 }}>▋</span>
                            )}
                        </Box>
                    </Box>
                ))}
                <div ref={endOfMessagesRef} /> {/* Scrolls to the bottom */}
            </Stack>
            <Box
                width="600px"
                mt={2}
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    placeholder="Type your message here..."
                    sx={{ bgcolor: 'white', color: 'black' }}
                />
                <Button 
                    variant="contained" 
                    onClick={sendMessage}
                    disabled={isTyping || !message.trim()}
                >
                    {isTyping ? 'Sending...' : 'Send'}
                </Button>
            </Box>
        </Box>
    );
}
