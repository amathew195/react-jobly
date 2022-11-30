import React from 'react';
import './App.css';
import { BrowserRouter }  from 'react-router-dom'
import RoutesList from './RoutesList';
import NavBar from './NavBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
