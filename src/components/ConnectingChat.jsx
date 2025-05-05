import React, { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

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
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={5}
    >
      <Typography variant="h5">Введи ім’я користувача</Typography>
      <TextField
        label="Ім’я"
        value={username}
        onChange={e => setUserName(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Приєднатися
      </Button>
    </Box>
  );
};

export default ConnectingChat;
