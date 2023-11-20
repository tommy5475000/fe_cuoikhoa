import { Button, Grid } from "@mui/material";
import React from "react";
import style from "./styleJobBook.module.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { bookJob } from "../../../../../apis/jobsAPI";
import Swal from "sweetalert2";

export default function JobBook({ jobId, data }) {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const {
    mutate: handleBook,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => bookJob(payload),
    onSuccess: () => {
      Swal.fire(
        "Đặt thành công!",
        "SUCCESS"
      ).then(function () {
        window.location.reload();
      });
    },
  });

  const maCongViec = jobId;
  const maNguoiThue = currentUser?.id;
  const currentDate = new Date();
  const ngayThue = currentDate.toLocaleDateString();
  const hoanThanh = false;

  const location = useLocation();
  const handleBookJob = () => {
    if (!currentUser) {
      // User chưa đăng nhập, bạn có thể thực hiện việc chuyển hướng đến trang login
      const url = `/sign-in?redirectTo=${location.pathname}`;
      // user chưa đăng nhập => redirect về trang login
      navigate(url);
    }

    const bookJobInfo = {
      maCongViec,
      maNguoiThue,
      ngayThue,
      hoanThanh,
    };

    handleBook(bookJobInfo);
  }

  return (
    <Grid className={style.js1}>
      <Grid className={style.js2}>
        {data.map((item) => {
          return (
            <Grid key={item.id}>
              <Grid container className={style.js3}>
                <Grid>
                  <h5>Standard</h5>
                </Grid>
                <Grid>${item.congViec.giaTien}</Grid>
              </Grid>

              <Grid className={style.js4}>
                <p>Create a simple web application for your business.</p>
              </Grid>

              <Grid className={style.js5}>
                <pre style={{ whiteSpace: "pre-wrap" }}>{item.congViec.moTaNgan}</pre>
              </Grid>

              <Grid className={style.js6}>
                <Button className={style.js61} onClick={handleBookJob}>Continue (${item.congViec.giaTien}) </Button>
              </Grid>
            </Grid>

          );
        })}
      </Grid>
    </Grid>
  );
}
