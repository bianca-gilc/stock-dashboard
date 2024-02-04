import './App.css';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/stockContext';
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("FB"); /* create global state */
  return (
    /*wrap dashboard in context provider to subscribe to context changes */
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
