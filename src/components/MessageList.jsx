import { useEffect, useRef } from 'react';

import { Stack } from '@mui/material';

import MessageItem from './MessageItem';

/**
 * MessageList component renders a list of messages
 */
const MessageList = ({ messages }) => {
  const afterMessagesRef = useRef();

  /**
   * Scrolls to the bottom of the message list when new messages arrive.
   */
  useEffect(() => {
    afterMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Stack spacing={1}>
      {/* Maps over messages and renders each one using the MessageItem component */}
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

      {/* Invisible element to help scrolling */}
      <span ref={afterMessagesRef} />
    </Stack>
  );
};

export default MessageList;
