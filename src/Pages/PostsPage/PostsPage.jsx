import './PostsPage.css';
import React, { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

const PostsPage = ({ id }) => {
  const [page, setPage] = useState({});
  const [image, setImage] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:1337/api/paginas/${id}?populate=*`, {
        headers
      });
      const res = await data.json();
      setPage(res.data.attributes);
      setImage(res.data.attributes.innerImage.data.attributes.url);
    }

    fetchData();
  }, [id]);

  console.log(page);

  return (
    <div className="posts-page">
      <Container fixed>
        <h1 class="inner-title--single">{page.innerTitle}</h1>

        <img className="inner-img" src={`${process.env.REACT_APP_API_URL}${image}`} alt="Imagem" />
        <div className="inner-text">
          <ReactMarkdown>
            {page.innerContent}
          </ReactMarkdown>
        </div>

      </Container>
      <Container fixed>
        <Button className="back-btn" variant="contained" color="inherit" onClick={() => navigate(-1)}>Voltar</Button>
      </Container>
    </div>
  )
}

export default PostsPage