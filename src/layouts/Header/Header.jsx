import '../Layouts.css';
import './Header.css';
import logo from '../../assets/logo.png';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN
}
// const loginData = {
//   identifier: 'guilhermerl.dev@gmail.com',
//   password: '2}{U0)xn|4L5d9'
// };

const Header = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas?fields[0]=innerTitle&fields[1]=url', {
        headers
      });
      const res = await data.json();
      setPages(res.data);
    }

    fetchData();
  }, []);

  return (
    <header>
      <div className="container-lg">
        <div className="items">
          <div className="logo">
            <a href={window.location.origin}>
              <img src={logo} alt="" />
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