import './Services.css';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@mui/material/Container';
import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const headers = {
  'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
}

const News = () => {
  const [services, setServices] = useState({});
  const [servicesPosts, setServicesPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/6', {
        headers
      });
      const res = await data.json();
      setServices(res.data.attributes);
    }

    const fetchPostsData = async () => {
      const data = await fetch('http://localhost:1337/api/servicos?populate=*', {
        headers
      });
      const res = await data.json();
      setServicesPosts(res.data);
    }

    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    const link = services.homeButtonLink;

    if (link) {
      const buttonTitle = services.homeButtonText;
      const targetLink = services.homeTab ? '_blank' : '_self';

      return <a href={`${link}`} target={targetLink}>{buttonTitle}</a>
    }
  }

  return (
    <div className="services">
      <Container fixed>
        <div className="top-content">
          <h2>{services.homeTitle}</h2>
          <p>{services.homeContent}</p>
        </div>

        <div className="posts">

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay
            spaceBetween={30}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              576: {
                slidesPerView: 2
              },
              992: {
                slidesPerView: 3
              },
              1200: {
                slidesPerView: 4
              }
            }}
          >
            {
              servicesPosts.map((item, index) => (
                <SwiperSlide key={index}>
                  <a key={index} href={item.attributes.link} target={item.attributes.tab ? '_blank' : '_self'} className="post" rel="noopener noreferrer">
                    <img src={`${process.env.REACT_APP_API_URL}${item.attributes.cardImage.data.attributes.url}`} alt="Imagem" />
                    <div className="post-content">
                      <p>{item.attributes.cardTitle}</p>
                    </div>
                  </a>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        
        <div className="bottom-content">
          {getLink()}
        </div>
      </Container>
    </div>
  )
}

export default News