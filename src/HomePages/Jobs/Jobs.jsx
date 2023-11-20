import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsJobs } from "../../apis/jobsAPI";
import { Button, Container, Grid, Modal } from "@mui/material";
import { lists } from "./listImg";
import style from "./styleJobs.module.scss";
import ReactPlayer from "react-player";
import JobsInfor from "./JobsInfor";
import JobsDetail from "./JobsDetail";



export default function Jobs() {
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

  const { jobtype,id } = useParams();

  const { data = [] } = useQuery({
    queryKey: ["detailsJob", id],
    queryFn: () => getDetailsJobs(id),
    enabled: !!id,
  });

  return (
    <Grid className={style.js1}>
      <Container>
        <Grid>
          {data.map((item) => (
            <>
              <img
                className={style.js11}
                src={
                  lists.find((img) => img.name === item.tenLoaiCongViec)?.img ||
                  ""
                }
                alt=""
              />
              <Grid className={style.js12}>
                <h1>{item.tenLoaiCongViec}</h1>
                <p className={style.js121}>
                  {lists.find((img) => img.name === item.tenLoaiCongViec)
                    ?.text || ""}
                </p>
                <Button className={style.js122} onClick={handleOpen}>
                  <span className={style.js1221}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentFill"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8ZM5.742 11.778 11.655 8.3a.348.348 0 0 0 0-.6L5.742 4.222a.348.348 0 0 0-.525.3v6.956a.348.348 0 0 0 .525.3Z"
                      ></path>
                    </svg>
                  </span>
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
            </>
          ))}
        </Grid>

        <Grid>
          <JobsInfor jobtype={jobtype}/>
        </Grid>

        <Grid>
          <JobsDetail jobtype={jobtype} data={data}/>
        </Grid>


      </Container>
    </Grid>
  );
}
