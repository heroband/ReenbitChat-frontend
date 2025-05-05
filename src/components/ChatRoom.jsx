import React, { useState } from 'react';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatRoom = ({ messages, onSend }) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" p={2}>
      <Typography variant="h6" gutterBottom>
        Чат
      </Typography>

      <Paper variant="outlined" sx={{ flexGrow: 1, p: 2, mb: 2, overflowY: 'auto' }}>
        <MessageList messages={messages} />
      </Paper>

      <MessageInput onSend={onSend} />
    </Box>
  );
};

export default ChatRoom;
