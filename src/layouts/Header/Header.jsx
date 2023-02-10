import '../Layouts.css';
import './Header.css';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const headers = { 'Content-type': 'application/json' }
const loginData = {
  identifier: 'guilhermerl.dev@gmail.com',
  password: '2}{U0)xn|4L5d9'
};

const Header = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas?fields[0]=innerTitle&fields[1]=url', {
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1OTkzOTM3LCJleHAiOjE2Nzg1ODU5Mzd9.pTzi55E9lVXK2wN1K2kDAxjDf1H7g0kv2MhBwEjq5eU',
          'Content-type': 'application/json'
        }
      });
      const res = await data.json();
      setPages(res.data);
    }

    fetchData();
  }, []);

  console.log(process.env.JWT_API_TOKEN);

  return (
    <header>
      <div className="container-lg">
        <div className="items">
          <div className="logo">
            <a href={window.location.origin}>
              {process.env.JWT_API_TOKEN}
            </a>
          </div>

          <ul>
            {pages.map(({ id, attributes }) => (
              <li key={id}>
                <Link to={`/${attributes.url}`}>{attributes.innerTitle}</Link>
              </li>
            ) )}
          </ul>

          <Outlet />
        </div>
      </div>
    </header>
  )
}

export default Header