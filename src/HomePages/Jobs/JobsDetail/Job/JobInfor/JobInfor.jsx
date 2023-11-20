import { Button, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../../../apis/jobsAPI";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import style from "./styleJobInfor.module.scss";
import Comment from "../Comment/Comment";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import JobBook from "../JobBook/JobBook";

export default function JobInfor() {
  const { id } = useParams();

  const { data = [] } = useQuery({
    queryKey: ["jobInfor", id],
    queryFn: () => getDetailJob(id),
  });
  return (
    <Grid className={style.js1}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={7}>
          <Grid>
            {data.map((item) => (
              <Grid className={style.js11} key={item.id}>
                {item.tenLoaiCongViec} <ArrowForwardIosIcon />{" "}
                {item.tenNhomChiTietLoai} <ArrowForwardIosIcon />{" "}
                {item.tenChiTietLoai}{" "}
              </Grid>
            ))}
          </Grid>
          <Grid className={style.js2}>
            {data.map((item) => {
              return (
                <Grid key={item.id}>
                  <h3>{item.congViec.tenCongViec}</h3>
                </Grid>
              );
            })}
          </Grid>
          <Grid>
            {data.map((item) => {
              return (
                <Grid key={item.id} container className={style.js3}>
                  <Grid item md={3} className={style.js32}>
                    <img
                      src={item.avatar}
                      alt={item.avatar}
                      className={style.js31}
                    />
                  </Grid>
                  <Grid item md={3} className={style.js32}>
                    <p className={style.js321}>{item.tenNguoiTao}</p>
                  </Grid>
                  <Grid item md={3} className={style.js32}>
                    <StarIcon style={{ fontSize: "25px" }} />{" "}
                    <span className={style.js321}>
                      {item.congViec.saoCongViec}
                    </span>
                  </Grid>
                  <Grid item md={3} className={style.js32}>
                    <p className={style.js321}>({item.congViec.danhGia})</p>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid className={style.js4}>
            {data.map((item) => (
              <Grid key={item.id}>
                <img
                  src={item.congViec.hinhAnh}
                  alt=""
                  className={style.js41}
                />
              </Grid>
            ))}
          </Grid>
          <Grid>
            <h2>About this gig</h2>
            <Grid className={style.js5}>
              {data.map((item) => (
                <Grid key={item.id}>{item.congViec.moTa}</Grid>
              ))}
            </Grid>
          </Grid>
          <Grid className={style.js6}>
            <h2>About the seller</h2>
            <Grid className={style.js63}>
              {data.map((item) => (
                <Grid container>
                  <Grid key={item.id} item md={5} className={style.js62}>
                    <img src={item.avatar} alt="" className={style.js61} />
                  </Grid>
                  <Grid item md={7} className={style.js65}>
                    <Grid>
                      <span>{item.tenNguoiTao}</span>
                    </Grid>
                    <Grid>
                      <span>{item.congViec.nguoiTao}</span>
                    </Grid>
                    <Grid style={{ display: "flex", alignItems: "center" }}>
                      <StarIcon style={{ fontSize: "20px" }} />
                      <span>{item.congViec.saoCongViec}</span>
                      <span>({item.congViec.danhGia})</span>
                    </Grid>
                    <Grid className={style.js66}>
                      <Button className={style.js67}>Contact me</Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* FAQ */}
          <Grid>
            <Grid
              container
              justifyContent={"space-between"}
              className={style.js7}
            >
              <Grid>
                <h5>Why SevenArc?</h5>
              </Grid>
              <Grid>
                <KeyboardDoubleArrowDownIcon />
              </Grid>
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              className={style.js7}
            >
              <Grid>
                <h5>What if i dont like the designs?</h5>
              </Grid>
              <Grid>
                <KeyboardDoubleArrowDownIcon />
              </Grid>
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              className={style.js7}
            >
              <Grid>
                <h5>What is included in Social Media Pack?</h5>
              </Grid>
              <Grid>
                <KeyboardDoubleArrowDownIcon />
              </Grid>
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              className={style.js7}
            >
              <Grid>
                <h5>What is vector file and do I need it ?</h5>
              </Grid>
              <Grid>
                <KeyboardDoubleArrowDownIcon />
              </Grid>
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              className={style.js7}
            >
              <Grid>
                <h5>Do I get all the designs with source files?</h5>
              </Grid>
              <Grid>
                <KeyboardDoubleArrowDownIcon />
              </Grid>
            </Grid>
          </Grid>

          <hr />
          <Grid>
            <Comment />
          </Grid>
        </Grid>

        <Grid item sm={12} md={5}>
          <JobBook jobId={id} data={data}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
