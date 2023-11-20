import { Button, Container, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { lists } from "./ListImgs";
import style from "./styleEverything.module.scss";
import ReactPlayer from "react-player";

export default function Everything() {
  const [movie, setMovie] = useState("")
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setMovie(
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
    );
    return setOpenModal(true);
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
    return setOpenModal(false);
  };
  return (
    <Grid className={style.js2}>
      <Container>
        <Grid className={style.js1}>
          <Grid item md={7} className={style.js12}>
            <h1 className={style.js111}>The best part? Everything.</h1>
            <Grid className={style.js111}>
              <Grid className={style.js11}>
                <Grid item md={4}>
                  <CheckCircleOutlineIcon
                    sx={{ width: "25px", height: "25px", paddingRight: "10px" }}
                  />
                </Grid>
                <Grid item md={8}>
                  <h3>Stick to your budget</h3>
                </Grid>
              </Grid>
              <p>
                Find the right service for every price point. No hourly rates,
                just project-based pricing.
              </p>
            </Grid>

            <Grid className={style.js111}>
              <Grid className={style.js11}>
                <Grid item md={4}>
                  <CheckCircleOutlineIcon
                    sx={{ width: "25px", height: "25px", paddingRight: "10px" }}
                  />
                </Grid>
                <Grid item md={8}>
                  <h3>Get quality work done quickly</h3>
                </Grid>
              </Grid>
              <p>
                Hand your project over to a talented freelancer in minutes, get
                long-lasting results.
              </p>
            </Grid>

            <Grid className={style.js111}>
              <Grid className={style.js11}>
                <Grid item md={4}>
                  <CheckCircleOutlineIcon
                    sx={{ width: "25px", height: "25px", paddingRight: "10px" }}
                  />
                </Grid>
                <Grid item md={8}>
                  <h3>Pay when you're happy</h3>
                </Grid>
              </Grid>
              <p>
                Upfront quotes mean no surprises. Payments only get released
                when you approve.
              </p>
            </Grid>

            <Grid className={style.js111}>
              <Grid className={style.js11}>
                <Grid item md={4}>
                  <CheckCircleOutlineIcon
                    sx={{ width: "25px", height: "25px", paddingRight: "10px" }}
                  />
                </Grid>
                <Grid item md={8}>
                  <h3>Count on 24/7 support</h3>
                </Grid>
              </Grid>
              <p>
                Our round-the-clock support team is available to help anytime,
                anywhere.
              </p>
            </Grid>
          </Grid>

          <Grid item md={5} className={style.js4}>
            {lists.map((item) => (
              <div>
                <img className={style.js5} src={item.img} alt={item.name} />
                <div className={style.js3} style={{ textAlign: "center" }}>
                  <Button
                    className={style.js41}
                    onClick={() => {
                      handleOpen();
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
                </div>
              </div>
            ))}
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
        </Grid>
      </Container>
    </Grid>
  );
}
