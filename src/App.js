import './App.css';
import Header from './Home/Header/Header';
import Footer from './Home/Footer/Footer';
import Home from './Home/Home';
import Page from './Pages/Page/Page';
import PostsPage from './Pages/PostsPage/PostsPage';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

function App() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas?fields[0]=menuTitle&fields[1]=slug&fields[2]=pagePosts', {
        headers
      });
      const res = await data.json();
      setRoutes(res.data)
    }

    fetchData();
  }, []);

  const getPages = () => {
    const page = routes.filter(route => !route.attributes.pagePosts);
    console.log(page);
    return page;
  }

  const getPagesPosts = (routes) => {
    const pagesPosts = routes.filter(route => route.attributes.pagePosts);
    return pagesPosts;
  }

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route index element={<Home />} />

          {
            getPagesPosts(routes).map(({ id, attributes }) => (
              <Route key={id} path={`/${attributes.slug}`} element={<PostsPage id={id} key={id} />} />
            ))
          }
          {
            getPages(routes).map(({ id, attributes }) => (
              <Route key={id} path={`/${attributes.slug}`} element={<Page id={id} key={id} />} />
            ))
          }
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
