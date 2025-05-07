import React from 'react';

import { toast } from 'react-toastify';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Paper, Typography } from '@mui/material';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

/**
 * ChatRoom component renders the chat interface including
 * the message list and message input field
 */
const ChatRoom = ({ messages, onSend, onLeave }) => {
  const handleSend = async text => {
    try {
      await onSend(text);
    } catch (err) {
      console.error('Error while sending message: ', err);
      toast.error('It was not possible to send a message');
    }
  };

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
      {/* Header */}
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
        <IconButton
          color="secondary"
          onClick={onLeave}
          sx={{
            color: 'red',
            ':hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Chat Container */}
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={800}
        flexGrow={1}
        sx={{ overflow: 'hidden' }}
      >
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

        {/* Input */}
        <Box sx={{ flexShrink: 0 }}>
          <MessageInput onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
