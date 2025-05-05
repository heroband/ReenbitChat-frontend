import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

const MessageInput = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      onSend(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <Box display="flex" gap={1}>
      <TextField
        fullWidth
        label="Повідомлення"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
      />
      <Button variant="contained" onClick={sendMessage}>
        Надіслати
      </Button>
    </Box>
  );
};

export default MessageInput;
