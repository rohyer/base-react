import './Partners.css';
import { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN }

const Partners = () => {
  const [partners, setPartners] = useState({});
  const [partnersPosts, setPartnersPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/3', {
        headers
      });
      const res = await data.json();
      setPartners(res.data.attributes);
    }

    const fetchPostsData = async () => {
      const data = await fetch('http://localhost:1337/api/parceiros?populate=*', {
        headers
      });
      const res = await data.json();
      setPartnersPosts(res.data);
    }

    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    const link = partners.homeButtonLink;
    const buttonText = partners.homeButtonText;

    if (link) {
      const buttonTarget = partners.homeTab ? '_blank' : '_self';

      return <Button href={link} target={buttonTarget}>{buttonText}</Button>
    } else {
      if (buttonText) return <Button href={partners.slug} target='_self'>{buttonText}</Button>
    }
  }

  const getPostCard = (attributes) => {
    return (
      <img src={`${process.env.REACT_APP_API_URL}${attributes.cardImage.data.attributes.url}`} alt="Imagem" />
    )
  }

  const getPostLink = (attributes, id) => {
    const link = attributes.link;

    if (link) {
      const targetLink = attributes.tab ? '_blank' : '_self';

      return (
        <a key={id} href={link} target={targetLink} className="post">
          {getPostCard(attributes)}
        </a>
      )
    } else {
      return (
        <a key={id} href={attributes.slug} target='_self' className="post">
          {getPostCard(attributes)}
        </a>
      )
    }
  }

  return (
    <div className="partners">
      <Container fixed>
        <div className="top-content">
          <h2>{partners.homeTitle}</h2>
          <p>{partners.excerpt}</p>
        </div>

        <div className="posts">
          {
            partnersPosts.map(({attributes, id}) => getPostLink(attributes, id))
          }
        </div>

        <div className="bottom-content">
          {getLink()}
        </div>
      </Container>
    </div>
  )
}

export default Partners