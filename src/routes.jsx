import { loader } from 'react-router-dom';
import Home from './Home/Home';
import Page from './Pages/Page/Page';
import PostsPage from './Pages/PostsPage/PostsPage';
import Post from './Pages/Post/Post';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

export const routes = [
  {
    'path': "/",
    'element': <Home />
  },
  {
    'path': 'quem-somos',
    'element': <Page id={1} />
  },
  {
    'path': 'noticias',
    'element': <PostsPage id={2} />
  },
  {
    'path': 'noticias/:noticiasSlug',
    'element': <Post />,
    'loader': async ({ params }) => {
      return fetch(`http://localhost:1337/api/noticias?filters[Slug][$eq]=${params.noticiasSlug}&populate=*`, {headers}).then(data => data.json());
    }
  },
  {
    'path': 'parceiros',
    'element': <PostsPage id={3} />
  },
  {
    'path': 'parceiros/:parceirosSlug',
    'element': <Post />,
    'loader': async ({ params }) => {
      return fetch(`http://localhost:1337/api/parceiros?filters[Slug][$eq]=${params.parceirosSlug}&populate=*`, {headers}).then(data => data.json());
    }
  },
  {
    'path': 'equipe',
    'element': <PostsPage id={4} />
  },
  {
    'path': 'equipe/:equipeSlug',
    'element': <Post />,
    'loader': async ({ params }) => {
      return fetch(`http://localhost:1337/api/equipes?filters[Slug][$eq]=${params.equipeSlug}&populate=*`, {headers}).then(data => data.json());
    }
  },
  {
    'path': 'servicos',
    'element': <PostsPage id={6} />
  },
  {
    'path': 'servicos/:servicosSlug',
    'element': <Post />,
    'loader': async ({ params }) => {
      return fetch(`http://localhost:1337/api/servicos?filters[Slug][$eq]=${params.servicosSlug}&populate=*`, {headers}).then(data => data.json());
    }
  },
]

// import { useEffect, useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Page from "./Pages/Page/Page";
// import PostsPage from "./Pages/PostsPage/PostsPage";

// const headers = {
//   'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
// }

// const fetchData = async () => {
//   let routes;
//   const data = await fetch('http://localhost:1337/api/paginas?fields[0]=slug&fields[1]=pagePosts', {
//     headers
//   });
//   const res = await data.json();
//   routes = await res.data;
//   return routes;
// }

// export const routess = async () => {
//   let routes = [];
//   const data = await fetchData();

//   data.map(({attributes, id}) => {
//     if (attributes.pagePosts) {
//       routes[id - 1] = {
//         'path': attributes.slug,
//         'element': <PostsPage />
//       }
//     } else {
//       routes[id - 1] = {
//         'path': attributes.slug,
//         'element': <Page />
//       }
//     }
//   });

//   return routes;
// }