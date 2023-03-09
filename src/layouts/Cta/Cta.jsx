import './Cta.css';
import { useState, useEffect } from 'react';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN }

const Cta = () => {
  const [cta, setCta] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/5', {
        headers
      });
      const res = await data.json();
      setCta(res.data.attributes);
    }

    fetchData();
  }, []);

  return (
    <div className='cta'>
      <div className="container-md">
        <div className="top-content">
          <h2>{cta.homeTitle}</h2>
          <p>{cta.homeContent}</p>
        </div>

        <div className="bottom-content">
          <a href={`${process.env.REACT_APP_ORIGIN_URL}/${cta.url}`} target={cta.homeTab ? '_balnk' : '_self'}>Saiba mais</a>
        </div>
      </div>
    </div>
  )
}

export default Cta