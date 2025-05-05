import { useState } from 'react';

import * as signalR from '@microsoft/signalr';

import ChatRoom from './components/ChatRoom';
import ConnectingChat from './components/ConnectingChat';

function App() {
  const [connection, setConnection] = useState(null);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  const startConnection = async username => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        'https://reenbit-chat-backend-gscdgycdamguegcp.westeurope-01.azurewebsites.net/chatHub',
      )
      .withAutomaticReconnect()
      .build();

    newConnection.on('ReceiveMessage', (username, message) => {
      console.log(`${username} - ${message}`);
      setMessages(messages => [...messages, { username, message }]);
    });

    try {
      await newConnection.start();
      await newConnection.invoke('JoinChat', username);
      console.log('SignalR підключено');
      setConnection(newConnection);
      setUsername(username);
    } catch (error) {
      console.log('Помилка при підключенні до SignalR:', error);
    }
  };

  const sendMessage = async message => {
    if (connection && username) {
      try {
        await connection.invoke('SendMessage', username, message);
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
