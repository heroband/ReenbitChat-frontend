import React, { useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatRoom = ({ messages, onSend }) => {
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
      {/* Заголовок над чатом */}
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        fontWeight="bold"
        sx={{ flexShrink: 0, mb: 1 }}
      >
        💬 Reenbit Chat
      </Typography>

      {/* Контейнер чату та інпуту */}
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={800}
        flexGrow={1}
        sx={{ overflow: 'hidden' }}
      >
        {/* Вікно чату зі скролом */}
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

        {/* Поле введення повідомлення */}
        <Box sx={{ flexShrink: 0 }}>
          <MessageInput onSend={onSend} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
