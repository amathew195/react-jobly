import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList';
import NavBar from './NavBar';

/**
 * This app component displays a website that allows users to navigate through
 * companies and job listings.
 *
 * Props - none
 * State - none
 *
 * App -> NavBar, RoutesList
 */

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
