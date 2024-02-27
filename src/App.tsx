import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes/routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <MainRoutes />
    </div>
  </BrowserRouter>
  )
}

export default App
