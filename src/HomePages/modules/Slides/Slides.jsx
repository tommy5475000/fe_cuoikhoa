import React, { useState } from "react";
import { lists } from "./Lists";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import style from "./styleSlides.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "@mui/system";
import { Button, Grid, Modal } from "@mui/material";
import ReactPlayer from "react-player";

SwiperCore.use([Pagination, Navigation]);

export default function Slides() {
    const [swiperRef, setSwiperRef] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [movie, setMovie] = useState("")
  
    const handleOpen = (video) => {
      setOpenModal(true);
      setMovie(video);
    };
  
    const styleModalVideo = {
      border: "none",
      backgroundColor: "tranferant",
      width: "640px",
      height: "auto",
      top: "15%",
      left: "30%",
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setMovie("")
    };

  return (
    <Grid className={style.js1}>
      <Container>
        <Swiper
          loop
          onSwiper={setSwiperRef}
          slidesPerView={1}
          navigation={true}
          className="mySwiper"
        >
          {lists.map((item) => (
            <SwiperSlide key={item.name}>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={12} sm={5} md={5} className={style.js4}>
                  <img className={style.js3} src={item.img} alt={item.name} />
                  <Button
                    className={style.js41}
                    onClick={() => {
                      handleOpen(item.video);
                    }}
                  >
                    <span>
                      <img
                        src="./img/buttonvideo.png"
                        alt=""
                        className={style.js42}
                      />
                    </span>
                  </Button>
                </Grid>
                <Modal
                  sx={styleModalVideo}
                  open={openModal}
                  onClose={handleCloseModal}
                >
                  <div>
                    <ReactPlayer url={`${movie}`} playing width="640px" />
                  </div>
                </Modal>

                <Grid item xs={12} sm={7} md={7}>
  
                  <h5 className={style.js11}>{item.name}</h5>
                    <span className={style.js12}>
                      <img src={item.logo} alt={item.name} />
                    </span>

                  <Grid>
                    <h3>{item.text}</h3>
                  </Grid>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Grid>
  );
}
