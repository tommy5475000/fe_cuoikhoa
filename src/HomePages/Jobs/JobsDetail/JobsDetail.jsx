import { Grid } from "@mui/material";
import React from "react";
import style from "./styleJobsDetail.module.scss";
import { useNavigate } from "react-router-dom";

export default function JobsDetail({ data, jobtype }) {
  const navigate = useNavigate();
  const handleToJob = (type, jobId) => {
    navigate(`/job/${type}/${jobId}`);
  };
  return (
    <Grid className={style.js1}>
      <h2>Explore {jobtype}</h2>
      <Grid className={style.js11}>
        {data.map((item) =>
          item.dsNhomChiTietLoai.map((itemdetail) => (
            <Grid key={itemdetail.id}>
              <Grid>
                <img src={itemdetail.hinhAnh} alt="" className={style.js12} />
              </Grid>

              <h2 className={style.js13}>{itemdetail.tenNhom}</h2>

              <Grid>
                {itemdetail.dsChiTietLoai.map((itemjob) => (
                  <div className={style.js14}>
                    <div
                      key={itemjob.id}
                      onClick={() =>
                        handleToJob(itemjob.tenChiTiet, itemjob.id)
                      }
                    >
                      {itemjob.tenChiTiet}
                    </div>

                    <span className={style.js141}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentFill"
                      >
                        <path d="M9.923 2.969a.702.702 0 0 0-1.031 0 .801.801 0 0 0 0 1.09l2.804 2.96H1.486c-.403 0-.73.345-.73.77 0 .426.327.77.73.77h10.358l-2.952 3.118a.801.801 0 0 0 0 1.09c.285.3.747.3 1.031 0l4.123-4.355a.801.801 0 0 0 0-1.09l-.069-.072a1.422 1.422 0 0 0-.01-.01L9.923 2.969Z"></path>
                      </svg>
                    </span>
                  </div>
                ))}
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
}
