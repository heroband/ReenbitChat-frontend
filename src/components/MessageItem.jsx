import { Box, Paper, Typography } from '@mui/material';

const MessageItem = ({ username, message, timestamp, messageType }) => {
  const isSystem = messageType === 'system';
  const isSelf = username === localStorage.getItem('chat-username');

  if (isSystem) {
    return (
      <Box textAlign="center" my={1}>
        <Typography variant="caption" color="gray" fontStyle="italic">
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent={isSelf ? 'flex-end' : 'flex-start'} mb={1}>
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          maxWidth: '70%',
          bgcolor: isSelf ? '#d1e7dd' : '#f8f9fa',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body1">{message}</Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="right"
        >
          {new Date(timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageItem;
