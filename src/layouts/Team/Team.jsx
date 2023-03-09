import './Team.css';
import { useState, useEffect } from 'react';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN }

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

  console.log(teamPosts);

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
      <div className="container-md">
        <div className="content">
          <div className="left-content">
            <h2>{team.homeTitle}</h2>
            <p>{team.homeContent}</p>
            {getLink()}
          </div>

          <div className="right-content">
            {
              teamPosts.slice(0, 3).map((item, index) => (
                <a key={index} href={`${process.env.REACT_APP_ORIGIN_URL}/${item.attributes.url}`} className="post">
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
      </div>
    </div>
  )
}

export default Team