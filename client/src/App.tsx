import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Practice from "./pages/Practice";
import Rank from './pages/Rank';

function App() {
  return (
      <Router>
        <div className="App bg-gray-700 h-screen flex align-middle">
          <Routes>
            <Route path='/rank' element={<Rank />} />
            <Route path='/' element={<Practice />} />
            <Route path='/*' element={<Navigate to={'/'} />} />
          </Routes>
        </div>
      </Router>
  );
}

// @ts-ignore
export default App;
