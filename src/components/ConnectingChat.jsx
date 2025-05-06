import React, { useState } from 'react';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const ConnectingChat = ({ joinChat }) => {
  const [username, setUserName] = useState('');

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
          Введи ім’я користувача
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Ім’я"
            value={username}
            onChange={e => setUserName(e.target.value)}
            autoFocus
          />
          <Button variant="contained" type="submit">
            Приєднатися
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConnectingChat;
