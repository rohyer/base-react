import './App.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './layouts/Banner/Banner';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}

export default App;
