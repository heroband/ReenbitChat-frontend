import { useEffect, useRef } from 'react';

import { Stack } from '@mui/material';

import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  const afterMessagesRef = useRef();

  useEffect(() => {
    afterMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Stack spacing={1}>
      {messages.map((msg, idx) => (
        <MessageItem
          key={idx}
          username={msg.user}
          message={msg.text}
          sentiment={msg.sentiment}
          timestamp={msg.timestamp}
          messageType={msg.messageType}
        />
      ))}
      <span ref={afterMessagesRef} />
    </Stack>
  );
};

export default MessageList;
