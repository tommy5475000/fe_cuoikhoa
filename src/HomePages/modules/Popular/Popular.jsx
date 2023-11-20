import React, { useState } from "react";
import lists from "./ListImgs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import style from "./stylePopular.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "@mui/system";

SwiperCore.use([Pagination, Navigation]);

export default function Popular() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <Container>
      <h1 className={style.js2}>Popular services</h1>
      <Swiper 
        loop
        onSwiper={setSwiperRef}
        slidesPerView={5}
        navigation={true}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}

      >
        {lists.map((item) => (
          <SwiperSlide key={item.name}>
            <div className={style.js1}>
              <img className={style.js11} src={item.img} alt={item.name} />
              <div className={style.js12}>
                <h4>{item.title}</h4>
                <h3>{item.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
