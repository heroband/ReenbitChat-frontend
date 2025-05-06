import { useEffect, useState } from 'react';

import * as signalR from '@microsoft/signalr';

import ChatRoom from './components/ChatRoom';
import ConnectingChat from './components/ConnectingChat';

function App() {
  const [connection, setConnection] = useState(null);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.removeItem('chat-username');
  }, []);

  const startConnection = async username => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        'https://reenbit-chat-backend-gscdgycdamguegcp.westeurope-01.azurewebsites.net/chatHub',
      )
      .withAutomaticReconnect()
      .build();

    newConnection.on('ReceiveMessage', messageDto => {
      console.log(`${messageDto.user} - ${messageDto.text}`);
      setMessages(prev => [...prev, messageDto]);
    });

    try {
      await newConnection.start();
      await newConnection.invoke('JoinChat', username);
      console.log('SignalR підключено');

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
      setMessages(prev => [...prev, ...data]);
      console.log('Отримані повідомлення з бекенда:', data);
    } catch (error) {
      console.error('Помилка при завантаженні повідомлень:', error);
    }
  };

  const sendMessage = async message => {
    if (connection && username) {
      try {
        await connection.invoke('SendMessage', {
          user: username,
          text: message,
        });
      } catch (error) {
        console.error('Помилка при надсиланні повідомлення:', error);
      }
    }
  };

  return connection ? (
    <ChatRoom messages={messages} onSend={sendMessage} />
  ) : (
    <ConnectingChat joinChat={startConnection} />
  );
}

export default App;
