import { useEffect, useState } from 'react';
import './News.css';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN}

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

    if (link) {
      const buttonTitle = news.homeButtonText;
      const targetLink = news.homeTab ? '_blank' : '_self';

      return <a href={`${link}`} target={targetLink}>{buttonTitle}</a>
    }
  }

  return (
    <div className="news">
      <div className="container-md">
        <div className="top-content">
          <h2>{news.homeTitle}</h2>
          <p>{news.homeContent}</p>
        </div>

        <div className="posts">
        {
          newsPosts.map((item, index) => (
            <a key={index} href={`${process.env.REACT_APP_ORIGIN_URL}/${item.attributes.url}`} className="post">
              <img src={`${process.env.REACT_APP_API_URL}${item.attributes.cardImage.data.attributes.url}`} alt="Imagem" />
              <div className="post-content">
                <p>{item.attributes.cardTitle}</p>
              </div>
            </a>
          ))
        }
        </div>
        
        <div className="bottom-content">
          {getLink()}
        </div>
      </div>
    </div>
  )
}

export default News