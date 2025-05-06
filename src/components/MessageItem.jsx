import { Box, Typography } from '@mui/material';

const MessageItem = ({ username, message, timestamp, messageType }) => {
  const isSystem = messageType === 'system';

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          fontStyle: isSystem ? 'italic' : 'normal',
          color: isSystem ? 'gray' : 'black',
          textAlign: isSystem ? 'center' : 'left',
        }}
      >
        {isSystem ? (
          message
        ) : (
          <>
            <strong>{username}:</strong> {message}
          </>
        )}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', textAlign: isSystem ? 'center' : 'left' }}
      >
        {new Date(timestamp).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default MessageItem;
