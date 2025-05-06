import { useState } from 'react';

import { Box, Button, Paper, TextField } from '@mui/material';

const MessageInput = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      onSend(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 1.5, borderRadius: 3 }}>
      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          label="Напиши щось..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          variant="outlined"
        />
        <Button variant="contained" onClick={sendMessage}>
          {'>'}
        </Button>
      </Box>
    </Paper>
  );
};

export default MessageInput;
