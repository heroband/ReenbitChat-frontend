import { Stack } from '@mui/material';

import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  return (
    <Stack spacing={1}>
      {messages.map((msg, idx) => (
        <MessageItem key={idx} username={msg.username} message={msg.message} />
      ))}
    </Stack>
  );
};

export default MessageList;
