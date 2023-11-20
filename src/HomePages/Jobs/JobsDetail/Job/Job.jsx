import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getJob, getMenuJobs } from "../../../../apis/jobsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Grid, Modal } from "@mui/material";
import style from "./styleJob.module.scss";
import ReactPlayer from "react-player";
import StarIcon from '@mui/icons-material/Star';

export default function Job() {
  const [movie, setMovie] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setMovie(
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd_nl/v1/video-attachments/generic_asset/asset/ab0907217c9f9a2c1d2eee677beb7619-1626082923646/how_fiverr_works"
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

  const { jobtype, id } = useParams();
  const { data = [] } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
  });


  const navigate =useNavigate()
  const handleToJob=(id)=>{
    navigate(`/jobInfor/${id}`);
  }
  return (
    <Grid className={style.js1}>
      <Container>
        <Grid>
          <h1>{jobtype}</h1>
        </Grid>
        <Grid className={style.js11}>
          <p className={style.js111}>
            Stand out from the crowd with a logo that fits your brand
            personality.
          </p>
          <span className={style.js13}> | </span>
          <Button className={style.js12} onClick={handleOpen}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentFill"
              className={style.js12}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8ZM5.742 11.778 11.655 8.3a.348.348 0 0 0 0-.6L5.742 4.222a.348.348 0 0 0-.525.3v6.956a.348.348 0 0 0 .525.3Z"
              ></path>
            </svg>
            How Fiverr Works
          </Button>

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
        <Grid className={style.js2} >
          {data.map((item) => (
            <Grid key={item.id} onClick={()=>handleToJob(item.id)}>
              <Grid>
                <img className={style.js21} src={item.congViec.hinhAnh} alt={item.congViec.id} />
              </Grid>
              <Grid className={style.js3}>
                <img className={style.js31} src={item.avatar} alt={item.id} />
                <p>{item.tenNguoiTao}</p>
              </Grid>
              <h4>{item.congViec.tenCongViec}</h4>
              <Grid className={style.js4}>
              <StarIcon/> 
                <span className={style.js41}>{item.congViec.saoCongViec} </span>
                <span>({item.congViec.danhGia})</span>
              </Grid>
              <Grid className={style.js5}><span className={style.js51} >From</span>${item.congViec.giaTien}</Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}
