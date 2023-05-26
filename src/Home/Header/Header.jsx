import '../Home.css';
import './Header.css';
import logo from '../../assets/logo.png';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Box, Drawer, Button, List, Divider, ListItem, IconButton } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';


const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}
// const loginData = {
//   identifier: 'guilhermerl.dev@gmail.com',
//   password: 'Vg7gzkXf6y!kqDb'
// };

const Header = () => {
  const [pages, setPages] = useState([]);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {pages.map(({ attributes, id }) => (
          <ListItem key={id} disablePadding>
            {getLinkResponsive(attributes)}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

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

  const getLinkDesktop = (attributes) => {
    const link = attributes.homeButtonLink;

    if (link) {
      const target = attributes.homeTab ? '_blank' : '_self';
      
      return <Link to={link} target={target}>{attributes.menuTitle}</Link>
    } else {
      return <Link to={attributes.slug} target='_self'>{attributes.menuTitle}</Link>
    }
  }

  const getLinkResponsive = (attributes) => {
    const link = attributes.homeButtonLink;

    if (link) {
      const target = attributes.homeTab ? '_blank' : '_self';
      
      return <Link className='responsive-navbar-link' to={link} target={target}>{attributes.menuTitle}</Link>
    } else {
      return <Link className='responsive-navbar-link' to={attributes.slug} target='_self'>{attributes.menuTitle}</Link>
    }
  }

  return (
    <header>
      <Container fixed>
        <div className="items">
          <div className="logo">
            <a href={window.location.origin}>
              <img src={logo} alt="" />
            </a>
          </div>

          <ul>
            {pages.map(({ attributes, id }) => (
              <li key={id}>
                {getLinkDesktop(attributes)}
              </li>
            ) )}
          </ul>

          <Button className='header-menu-button' onClick={toggleDrawer('right', true)}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ pr: 0 }}
              >
              <Menu />
            </IconButton>
          </Button>

          <Outlet />
        </div>
      </Container>

      <Drawer
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <Close
          className='responsive-menu-close'
          onClick={toggleDrawer('right', false)}
        />
        {list('right')}
      </Drawer>
    </header>
  )
}

export default Header