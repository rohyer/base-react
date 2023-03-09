import './App.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './layouts/Banner/Banner';
import About from './layouts/About/About';
import News from './layouts/News/News';
import Partners from './layouts/Partners/Partners';
import Services from './layouts/Services/Services';
import Team from './layouts/Team/Team';
import Cta from './layouts/Cta/Cta';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <About />
      <News />
      <Partners />
      <Services />
      <Team />
      <Cta />
      <Footer />
    </div>
  );
}

export default App;
