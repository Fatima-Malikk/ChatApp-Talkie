import './App.css';
import { Route } from "react-router-dom";
import ChatPage from './Pages/ChatPage';
import Homepage from './Pages/HomePage';
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config

function App() {
  const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const App= extendTheme({ config })
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path = "/chats" component={ChatPage} />
    </div>
  );
}

export default App;
