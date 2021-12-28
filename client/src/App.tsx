import React from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter, 
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { render } from '@testing-library/react';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/about" style={{ padding: 5 }}>About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  )
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  )
}

export default App;