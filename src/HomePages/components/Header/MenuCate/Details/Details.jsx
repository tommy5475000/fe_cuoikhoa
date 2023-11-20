import React from "react";
import { Grid } from "@mui/material";
import style from "./styleDetails.module.scss";

export default function Details({ data, jobId ,getClick}) {
  // Lọc danh sách công việc dựa trên jobId
  const jobDetails = data.find((item) => item.id === jobId);
  return (
    <Grid>
      {jobDetails?.dsNhomChiTietLoai.length === 0 ? (
        <div>Đang cập nhật</div>
      ) : (
        jobDetails?.dsNhomChiTietLoai.map((tennhom) => {
          return (
            <div key={tennhom.id} className={style.js1}>
              <div className={style.js11}>
                <h3 className={style.js2}>{tennhom.tenNhom}</h3>
                <div>
                  {tennhom.dsChiTietLoai.map((chiTiet) => (
                    <div key={chiTiet.id}>
                      <p
                        className={style.js2}
                        onClick={() => {
                          getClick(
                            jobDetails.tenLoaiCongViec,
                            chiTiet.tenChiTiet,
                            chiTiet.id
                          );
                        }}
                      >
                        {chiTiet.tenChiTiet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </Grid>
  );
}
