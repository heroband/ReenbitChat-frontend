import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Paper, Typography } from '@mui/material';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

/**
 * ChatRoom component renders the chat interface including
 * the message list and message input field
 */
const ChatRoom = ({ messages, onSend, onLeave }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      sx={{
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        p: { xs: 1, sm: 3 },
        boxSizing: 'border-box',
      }}
    >
      {/* Chat header with the leave button */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        sx={{ flexShrink: 0, mb: 1 }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          💬 Reenbit Chat
        </Typography>

        {/* Leave chat button */}
        <IconButton
          color="secondary"
          onClick={onLeave}
          sx={{
            color: 'red', // колір хрестика
            ':hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Main chat container with messages and input */}
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={800}
        flexGrow={1}
        sx={{ overflow: 'hidden' }}
      >
        {/* Scrollable message list */}
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            mb: 2,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.7)',
          }}
        >
          <MessageList messages={messages} />
        </Paper>

        {/* Message input field */}
        <Box sx={{ flexShrink: 0 }}>
          <MessageInput onSend={onSend} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
