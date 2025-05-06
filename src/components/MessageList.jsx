import { Stack } from '@mui/material';

import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  return (
    <Stack spacing={1}>
      {messages.map((msg, idx) => (
        <MessageItem
          key={idx}
          username={msg.user}
          message={msg.text}
          timestamp={msg.timestamp}
          messageType={msg.messageType}
        />
      ))}
    </Stack>
  );
};

export default MessageList;
