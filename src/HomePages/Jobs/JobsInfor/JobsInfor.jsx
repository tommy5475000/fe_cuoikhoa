import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Grid } from "@mui/material";
import { lists } from "./lists";
import style from "./styleJobsInfor.module.scss";

export default function ({ jobtype }) {
  return (
    <Grid className={style.js1}>
      <h2>Popular in {jobtype}</h2>
      <Grid>
        <Grid>
          <Grid className={style.js11}>
            {lists.map((item) => (
              <Grid className={style.js12}>
                <Grid key={item.name}>
                  <img src={item.url} alt={item.name}  className={style.js121}/>
                </Grid>
                <Grid className={style.js122}>
                  <p>{item.name}</p>
                  <ArrowRightAltIcon size={20} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
