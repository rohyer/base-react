import React, { useEffect, useState } from 'react'

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

const Page = ({ id }) => {
  const [page, setPage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:1337/api/paginas/${id}`, {
        headers
      });
      const res = await data.json();
      setPage(res.data.attributes);
    }

    fetchData();
  }, []);

  console.log(page);

  return (
    
    <div>Página sem Postagens {page.innerTitle}</div>
  )
}

export default Page