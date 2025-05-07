import React, { useState } from 'react';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';

/**
 * The ConnectingChat component allows the user
 * to enter a username and join a chat. Once the username
 * is specified, the `joinChat` function is called
 * to set the connection
 */
const ConnectingChat = ({ joinChat }) => {
  const [username, setUserName] = useState('');

  /**
   * Handles the form submission when the user enters username
   * Calls `joinChat` if the username is not empty
   */
  const handleSubmit = e => {
    e.preventDefault();
    if (username.trim()) {
      joinChat(username.trim());
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 320,
          textAlign: 'center',
          borderRadius: 4,
          background: 'linear-gradient(to top, #ffffff, #f0f4ff)',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enter your name
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {/* Input field for the username */}
          <TextField
            label="Username"
            value={username}
            onChange={e => setUserName(e.target.value)}
            autoFocus
          />

          {/* Button to submit the form and join the chat */}
          <Button variant="contained" type="submit">
            Join
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConnectingChat;
