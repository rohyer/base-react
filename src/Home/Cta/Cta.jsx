import './Cta.css';
import { useState, useEffect } from 'react';
import { Container, Button} from '@mui/material';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN }

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
      <Container fixed>
        <div className="top-content">
          <h2>{cta.homeTitle}</h2>
          <p>{cta.homeContent}</p>
        </div>

        <div className="bottom-content">
          <Button href={`${process.env.REACT_APP_ORIGIN_URL}/${cta.pageID}`} target={cta.homeTab ? '_balnk' : '_self'}>Saiba mais</Button>
        </div>
      </Container>
    </div>
  )
}

export default Cta