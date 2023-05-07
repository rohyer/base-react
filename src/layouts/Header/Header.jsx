import '../Layouts.css';
import './Header.css';
import logo from '../../assets/logo.png';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}
// const loginData = {
//   identifier: 'guilhermerl.dev@gmail.com',
//   password: 'Vg7gzkXf6y!kqDb'
// };

const Header = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas?fields[0]=menuTitle&fields[1]=slug&fields[2]=homeButtonLink&fields[3]=homeTab', {
        headers
      });
      const res = await data.json();
      setPages(res.data);
    }

    fetchData();
  }, []);

  const getLink = (attributes) => {
    const link = attributes.homeButtonLink;

    if (link) {
      const target = attributes.homeTab ? '_blank' : '_self';
      
      return <Link to={link} target={target}>{attributes.menuTitle}</Link>
    } else {
      return <Link to={attributes.slug} target='_self'>{attributes.menuTitle}</Link>
    }
  }

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
            {pages.map(({ attributes, id }) => (
              <li key={id}>
                {getLink(attributes)}
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