import * as signalR from '@microsoft/signalr';

let connection = null;

const startConnection = async username => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(
      'https://reenbit-chat-backend-gscdgycdamguegcp.westeurope-01.azurewebsites.net/chatHub',
    )
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    await connection.invoke('JoinChat', username);
    console.log('SignalR підключено');
  } catch (error) {
    console.log('Помилка при підключенні до SignalR:', error);
  }
};

export default { startConnection };
