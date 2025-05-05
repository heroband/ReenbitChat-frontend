import { Box, Typography } from '@mui/material';

const MessageItem = ({ username, message }) => {
  return (
    <Box>
      <Typography variant="body2">
        <strong>{username}:</strong> {message}
      </Typography>
    </Box>
  );
};

export default MessageItem;
