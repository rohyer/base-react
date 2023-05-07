import React from 'react';
import Banner from './Banner/Banner';
import About from './About/About';
import News from './News/News';
import Partners from './Partners/Partners';
import Services from './Services/Services';
import Team from './Team/Team';
import Cta from './Cta/Cta';

const Home = () => {
  return (
    <main>
      <Banner />
      <About />
      <News />
      <Partners />
      <Services />
      <Team />
      <Cta />
    </main>
  )
}

export default Home