import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import './News.css';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

const News = () => {
  const [news, setNews] = useState({});
  const [newsPosts, setNewsPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/2', {
        headers
      });
      const res = await data.json();
      setNews(res.data.attributes);
    }

    const fetchPostsData = async () => {
      const data = await fetch('http://localhost:1337/api/noticias?populate=*', {
        headers
      });
      const res = await data.json();
      setNewsPosts(res.data);
    }

    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    const link = news.homeButtonLink;
    const buttonText = news.homeButtonText;

    if (link) {
      const targetLink = news.homeTab ? '_blank' : '_self';

      return (
        <Button>
          <Link to={link} target={targetLink}>{buttonText}</Link>
        </Button>
      )
    } else {
      if (buttonText) {
        return (
          <Button>
            <Link to={news.slug} target='_self'>{buttonText}</Link>
          </Button>
        )
      }
    }
  }

  const getPostCard = (attributes) => {
    return (
      <>
        <img src={`${process.env.REACT_APP_API_URL}${attributes.cardImage.data.attributes.url}`} alt="Imagem" />
        <div className="post-content">
          <p>{attributes.cardTitle}</p>
        </div>
      </>
    )
  }

  const getPostLink = (attributes, id) => {
    const slug = attributes.slug;
    const content = attributes.innerContent;

    if (content) {

      return (
        <Link key={id} to={`/noticias/${slug}`}  className="post">
          {getPostCard(attributes)}
        </Link>
      )
    } else {
      return (
        <div key={id} className="post">
          {getPostCard(attributes)}
        </div>
      )
    }
  }

  return (
    <div className="news">
      <Container fixed>
        <div className="top-content">
          <h2>{news.homeTitle}</h2>
          <p>{news.homeContent}</p>
        </div>

        <div className="posts">
        {newsPosts.map(({attributes, id}) => getPostLink(attributes, id))}
        </div>
        
        <div className="bottom-content">
          {getLink()}
        </div>
      </Container>
    </div>
  )
}

export default News