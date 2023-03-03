import './Banner.css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const headers = { 'Authorization': 'Bearer ' + process.env.REACT_APP_JWT_API_TOKEN }

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

  const getLink = (id) => {
    const link = banners[id].attributes.homeButtonLink;

    if (link) {
      const buttonTitle = banners[id].attributes.homeButtonText;
      const targetLink = banners[id].attributes.homeTab ? '_blank' : '_self';

      return <a href={`${link} `} target={targetLink}>{buttonTitle}</a>
    }
  }

  console.log(banners);

  return (
    <section className="banner">
      <div className="container-md">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          autoplay
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            banners.map((currentValue, index) => (
              <SwiperSlide key={index} className="card">
                <div className="image">
                  <img src={`${process.env.REACT_APP_ORIGIN_URL}${currentValue.attributes.homeImage.data.attributes.url}`} alt="" />
                </div>
                <div className="content">
                  <h2>{currentValue.attributes.homeTitle}</h2>
                  <p>{currentValue.attributes.homeContent}</p>
                  {getLink(index)}
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default Banner