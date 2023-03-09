import './Partners.css';
import { useState, useEffect } from 'react';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN }

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

    if (link) {
      const buttonText = partners.homeButtonText;
      const buttonTarget = partners.homeTab ? '_blank' : '_self';

      return <a href={link} target={buttonTarget}>{buttonText}</a>
    }
  }

  return (
    <div className="partners">
      <div className="container-md">
        <div className="top-content">
          <h2>{partners.homeTitle}</h2>
          <p>{partners.excerpt}</p>
        </div>

        <div className="posts">
          {
            partnersPosts.map((item, index) => (
              <a key={index} href={item.attributes.link} target={item.attributes.tab ? '_blank' : '_self'} className="post">
                <img src={`${process.env.REACT_APP_API_URL}${item.attributes.cardImage.data.attributes.url}`} alt="Imagem" />
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

export default Partners