import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMenuJobs } from "../../../apis/jobsAPI";
import { Box, Container, Grid } from "@mui/material";
import style from "./styleYouNeedIt.module.scss";
import { lists } from "./ListIcons";

export default function YouNeedIt() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["icon"],
    queryFn: getMenuJobs,
  });

  return (
    <div className={style.js1}>
      <Container>
        <h1 className={style.js13}>You need it, we've got it</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 12, md: 12 }}
          >
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={3} className={style.js11}>
                <img
                  className={style.js12}
                  src={
                    lists.find((icon) => icon.name === item.tenLoaiCongViec)
                      ?.img || ""
                  }
                  alt=""
                />
                {item.tenLoaiCongViec}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
