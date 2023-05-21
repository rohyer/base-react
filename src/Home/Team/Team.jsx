import './Team.css';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

const Team = () => {
  const [team, setTeam] = useState({});
  const [teamPosts, setTeamPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/4', {
        headers
      });
      const res = await data.json();
      setTeam(res.data.attributes);
    }
    const fetchPostsData = async () => {
      const data = await fetch('http://localhost:1337/api/equipes?populate=*', {
        headers
      });
      const res = await data.json();
      setTeamPosts(res.data);
    }

    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    const link = team.homeButtonLink;

    if (link) {
      const buttonTitle = team.homeButtonText;
      const targetLink = team.homeTab ? '_blank' : '_self';

      return <a href={link} target={targetLink}>{buttonTitle}</a>
    }
  }

  return (
    <div className="team">
      <Container fixed>
        <div className="content">
          <div className="left-content">
            <h2>{team.homeTitle}</h2>
            <p>{team.homeContent}</p>
            {getLink()}
          </div>

          <div className="right-content">
            {
              teamPosts.slice(0, 3).map((item, index) => (
                <a key={index} href={item.attributes.link} target={item.attributes.tab ? '_blank' : '_self'} className="post" rel="noopener noreferrer">
                  <img src={`${process.env.REACT_APP_API_URL}${item.attributes.cardImage.data.attributes.url}`} alt="Imagem da equipe" />
                  <div className="post-content">
                    <p className="post-name">{item.attributes.cardName}</p>
                    <p className="post-job">{item.attributes.cardJob}</p>
                  </div>
                </a>
              ))
            }
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Team