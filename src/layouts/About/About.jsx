import './About.css';
import { useState, useEffect } from 'react';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN}

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

    if (link) {
      const buttonTitle = aboutContent.homeButtonText;
      const targetLink = aboutContent.homeTab ? '_blank' : '_self';

      return <a href={`${link}`} target={targetLink}>{buttonTitle}</a>
    }
  }

  return (
    <section className='about'>
      <div className="container-md">
        <div className="content">
          <div className="text">
            <h2>{aboutContent.homeTitle}</h2>
            <p>{aboutContent.homeContent}</p>
            {getLink()}
          </div>
          <div className="img">
            <img src={`${process.env.REACT_APP_ORIGIN_URL}${aboutImage}`} alt="Imagem" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About