import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.scss";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import axios from "axios";
// props
// numberOfSlide
// Carousel => numberOfSlide = 1 => hien thi 1 thang
// Carousel => numberOfSlide = 6 => hien thi 6 thang

export default function App({ numberOfSlide, category }) {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const response = await axios.get(
      "https://6627a8d2b625bf088c092e93.mockapi.io/movies-netflix"
    );
    console.log(response.data);
    setMovies(response.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={numberOfSlide}
        spaceBetween={10}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper carousel"
      >
        {/* movie => SwiperSlide */}
        {/* cu moi movie trong movies => SwiperSlides */}
        {movies
          .filter((movie) => movie.category === category)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <img src={movie.poster_path} alt="" />
            </SwiperSlide>
          ))}
        ;
        <SwiperSlide>
          <img
            src="https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Flat-mat-7.jpg&w=3840&q=75"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
