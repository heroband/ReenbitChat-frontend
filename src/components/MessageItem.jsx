import { Box, Paper, Typography } from '@mui/material';

/**
 * MessageItem component displays a message in the chat
 * It shows the sender's username, message content, sentiment, and time
 */
const MessageItem = ({ username, message, sentiment, timestamp, messageType }) => {
  // Check if the message is a system message or from the current user
  const isSystem = messageType === 'system';
  const isSelf = username === localStorage.getItem('chat-username');

  /**
   * Returns the emoji representation based on sentiment
   */
  const getSentimentEmoji = sentiment => {
    switch (sentiment) {
      case 'Positive':
        return '😊';
      case 'Negative':
        return '😞';
      case 'Neutral':
        return '😐';
      default:
        return '';
    }
  };

  // Render system messages
  if (isSystem) {
    return (
      <Box textAlign="center" my={1}>
        <Typography variant="caption" color="gray" fontStyle="italic">
          {message}
        </Typography>
      </Box>
    );
  }

  // Render user messages with dynamic alignment based on whether the message is from the current user
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
        {/* Display username and sentiment emoji */}
        <Typography variant="body2" fontWeight="bold">
          {username}
          {getSentimentEmoji(sentiment)}
        </Typography>

        {/* Display the actual message */}
        <Typography
          variant="body1"
          sx={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {message}
        </Typography>

        {/* Display the time */}
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
