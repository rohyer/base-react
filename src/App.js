import './App.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './layouts/Banner/Banner';
import About from './layouts/About/About';
import News from './layouts/News/News';
import Partners from './layouts/Partners/Partners';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <About />
      <News />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;
