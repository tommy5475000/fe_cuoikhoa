import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMenuJobs } from "../../../../apis/jobsAPI";
import { Grid } from "@mui/material";
import style from "./styleMenuCate.module.scss";
import Details from "./Details";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuCate() {
  const [isVisible, setIsVisible] = useState(false);
  const [jobId, setJobId] = useState(null);

  const navigate = useNavigate(); //thêm
  // hàm nhấn vào list xong navigate thêm
  const handleClickJob = (type, id) => {
    navigate(`/types/${type}/${id}`); // Truyền giá trị từ state vào navigate
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getMenuJobs,
  });
console.log(data);
  return (
    //Ẩn khi di chuột ra
    <Grid onMouseLeave={() => setIsVisible(false)}>
      <Grid
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex", justifyContent: "center" },
        }}
      >
        {data.map((item) => (
          <Grid
            className={style.js1}
            key={item.id}
            sx={{
              my: 1,
              color: "black",
              display: "block",
            }}
            //thêm
            onClick={(e) => {
              handleClickJob(item.tenLoaiCongViec, item.id);
              e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên cha
            }}
            onMouseEnter={() => {
              setJobId(item.id); // Lấy id của item khi di chuột vào
              setIsVisible(true); // Hiển thị khi hover
            }}
          >
            {item.tenLoaiCongViec}
            {isVisible && jobId === item.id && (
              <div className={style.visible}  onClick={(e) => e.stopPropagation()}>
                <Details data={data} jobId={item.id} getClick={handleClickJob} />
              </div>
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
