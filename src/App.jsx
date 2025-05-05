import './App.css';
import ConnectingChat from './components/ConnectingChat';
import chatService from './services/chatService';

function App() {
  return <ConnectingChat joinChat={chatService.startConnection} />;
}

export default App;
