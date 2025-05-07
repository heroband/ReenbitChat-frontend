import { useState } from 'react';

import { Box, Button, Paper, TextField } from '@mui/material';

/**
 * MessageInput component created an input field and button
 */
const MessageInput = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState('');

  /**
   * Sends the message if it's not empty
   */
  const sendMessage = () => {
    if (newMessage.trim()) {
      onSend(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 1.5, borderRadius: 3 }}>
      <Box display="flex" gap={1}>
        {/* Input field for typing the message */}
        <TextField
          fullWidth
          label="Write something..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          variant="outlined"
        />

        {/* Button to send the message */}
        <Button variant="contained" onClick={sendMessage}>
          ✉️
        </Button>
      </Box>
    </Paper>
  );
};

export default MessageInput;
