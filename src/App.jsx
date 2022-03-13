import './App.css';
import Chat from './components/Chat.jsx';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        {/* sidebar */}
        <Sidebar/>
        <Chat />
        {/* chat */}
      </div>
    </div>
  );
}

export default App;
