import './Banner.css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container, Button } from '@mui/material';
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

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/banners?populate=*', {
        headers
      });
      const res = await data.json();
      setBanners(res.data);
    }
    fetchData();
  }, []);

  const getLink = (attributes) => {
    const link = attributes.homeButtonLink;
    const buttonText = attributes.homeButtonText;

    if (link) {
      const targetLink = attributes.homeTab ? '_blank' : '_self';

      return <Button href={link} target={targetLink}>{buttonText}</Button>
    } else {
      if (buttonText) return <Button href={attributes.slug} target='_self'>{buttonText}</Button>
    }
  }

  return (
    <section className="banner">
      <Container fixed>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          autoplay
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            banners.map(({attributes, id}) => (
              <SwiperSlide key={id} className="card">
                <div className="image">
                  <img src={`${process.env.REACT_APP_API_URL}${attributes.homeImage.data.attributes.url}`} alt="" />
                </div>
                <div className="content">
                  <h2>{attributes.homeTitle}</h2>
                  <p>{attributes.homeContent}</p>
                  {getLink(attributes)}
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Container>
    </section>
  )
}

export default Banner