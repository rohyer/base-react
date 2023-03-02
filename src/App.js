import './App.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
