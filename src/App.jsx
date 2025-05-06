import { useEffect, useRef, useState } from 'react';

import * as signalR from '@microsoft/signalr';

import ChatRoom from './components/ChatRoom';
import ConnectingChat from './components/ConnectingChat';

function App() {
  const [connection, setConnection] = useState(null);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedUsername = localStorage.getItem('chat-username');
    const isConnected = connection?.state === signalR.HubConnectionState.Connected;
    console.log(`useEffect connection is ${connection} `);

    if (savedUsername && !isConnected) {
      startConnection(savedUsername);
    }

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  const startConnection = async username => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44347/chatHub')
      .withAutomaticReconnect()
      .build();

    // 'https://reenbit-chat-backend-gscdgycdamguegcp.westeurope-01.azurewebsites.net/chatHub'

    newConnection.on('ReceiveMessage', messageDto => {
      console.log(`got a message`, messageDto);
      setMessages(prev => [...prev, messageDto]);
    });

    try {
      await newConnection.start();
      await newConnection.invoke('JoinChat', username);
      setConnection(newConnection);

      setUsername(username);
      localStorage.setItem('chat-username', username);

      await fetchMessages();
    } catch (error) {
      console.log('Помилка при підключенні до SignalR:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://reenbit-chat-backend-gscdgycdamguegcp.westeurope-01.azurewebsites.net/api/messages`,
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Помилка при завантаженні повідомлень:', error);
    }
  };

  const sendMessage = async message => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected &&
      username
    ) {
      try {
        await connection.invoke('SendMessage', {
          user: username,
          text: message,
        });
      } catch (error) {
        console.error('Помилка при надсиланні повідомлення:', error);
      }
    } else {
      console.error(`Немає підключення чи з'єднання не готове`);
    }
  };

  return connection ? (
    <ChatRoom messages={messages} onSend={sendMessage} />
  ) : (
    <ConnectingChat joinChat={startConnection} />
  );
}

export default App;
