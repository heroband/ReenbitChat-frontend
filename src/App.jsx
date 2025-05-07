import { useEffect, useRef, useState } from 'react';

import * as signalR from '@microsoft/signalr';

import ChatRoom from './components/ChatRoom';
import ConnectingChat from './components/ConnectingChat';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [connection, setConnection] = useState(null); // SignalR connection instance
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]); // Last messages

  useEffect(() => {
    const savedUsername = localStorage.getItem('chat-username');
    const isConnected = connection?.state === signalR.HubConnectionState.Connected;
    console.log(`useEffect connection is ${connection} `);

    // Reconnect automatically if user info is stored and connection is not active
    if (savedUsername && !isConnected) {
      startConnection(savedUsername);
    }

    // Cleanup on unmount
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  /**
   * Initializes the SignalR connection and joins the chat
   * Also loads existing messages and waiting for new ones
   */
  const startConnection = async username => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BACKEND_URL}/chathub`)
      .withAutomaticReconnect()
      .build();

    // Handle incoming messages from the server
    newConnection.on('ReceiveMessage', messageDto => {
      setMessages(prev => [...prev, messageDto]);
    });

    try {
      await newConnection.start();
      await newConnection.invoke('JoinChat', username); // Notify server that a user has joined
      setConnection(newConnection);
      setUsername(username);
      localStorage.setItem('chat-username', username);

      await fetchMessagesWithRetry(); // Load chat history
    } catch (error) {
      console.log('Error while connecting to SignalR:', error);
    }
  };

  /**
   * Attempts to fetch message history with retry logic
   */
  const fetchMessagesWithRetry = (retries = 5, delay = 2000) => {
    const tryFetch = async (attempt = 1) => {
      console.log(`Trying to fetch messages...`);
      try {
        const response = await fetch(`${BACKEND_URL}/api/messages`);

        const text = await response.text();

        if (!response.ok || !text) {
          throw new Error(`Attempt ${attempt}: Server returned invalid response`);
        }

        const data = JSON.parse(text);
        setMessages(data);
        console.log(`Success - Messages loaded after ${attempt} attempts`);
      } catch (error) {
        console.warn(error.message);
        if (attempt < retries) {
          setTimeout(() => tryFetch(attempt + 1), delay);
        } else {
          console.error('Fail - Unable to load messages after multiple attempts.');
        }
      }
    };

    tryFetch();
  };

  /**
   * Sends a new message to the chat
   */
  const sendMessage = async message => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected &&
      username
    ) {
      try {
        console.log(connection.state);

        await connection.invoke('SendMessage', {
          user: username,
          text: message,
        });
      } catch (error) {
        console.error('Error while sending message:', error);
      }
    } else {
      console.error(`No connection or connection is not ready`);
    }
  };

  const leaveChat = async () => {
    await connection.stop();
    setConnection(null);
    localStorage.removeItem('chat-username');
  };

  // Render chat or connection screen depending on connection state
  return connection ? (
    <ChatRoom messages={messages} onSend={sendMessage} onLeave={leaveChat} />
  ) : (
    <ConnectingChat joinChat={startConnection} />
  );
}

export default App;
