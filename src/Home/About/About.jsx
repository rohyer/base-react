import './About.css';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Button } from '@mui/material';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

const About = () => {
  const [aboutContent, setAboutContent] = useState({});
  const [aboutImage, setAboutImage] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/1?populate=*', {
        headers
      });
      const res = await data.json();
      setAboutContent(res.data.attributes);
      setAboutImage(res.data.attributes.homeImage.data.attributes.url);
    }

    fetchData();
  }, []);

  const getLink = () => {
    const link = aboutContent.homeButtonLink;
    const buttonText = aboutContent.homeButtonText;

    if (link) {
      const targetLink = aboutContent.homeTab ? '_blank' : '_self';

      return (
        <Button>
          <Link to={link} target={targetLink}>{buttonText}</Link>
        </Button>
      )
    } else {
      if (buttonText) {
        return (
          <Button>
            <Link to={aboutContent.slug} target='_self'>{buttonText}</Link>
          </Button>
        )
      }
    }
  }

  return (
    <section className='about'>
      <Container fixed>
        <div className="content">
          <div className="text">
            <h2>{aboutContent.homeTitle}</h2>
            <p>{aboutContent.homeContent}</p>
            {getLink()}
          </div>
          <div className="img">
            <img src={`${process.env.REACT_APP_API_URL}${aboutImage}`} alt="Imagem" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About