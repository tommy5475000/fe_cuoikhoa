import Carousel from "react-material-ui-carousel";
import React from "react";
import { list } from "./ListsImg";
import { listicons } from "./ListIcons";
import style from "./styleBanner.module.scss";
import { Container, Grid } from "@mui/material";
import Search from "../../components/Header/MenuNav/Search/Search";
import StarIcon from '@mui/icons-material/Star';

export default function Banner() {


  return (
    <>
      <Carousel autoPlay={true} swipe={false} indicators={false}>
        {list.map((item) => (
          <>
            <Grid>
              <img
                key={item.item}
                src={item.img}
                alt={item.name}
                className={style.js1}
              />
            </Grid>
            <Grid className={style.js5}>
              <Grid className={style.js51}>
                <Grid item md={4}>
                  <img src={item.imgicon} alt={item.name} />
                </Grid>
                <Grid item md={8} className={style.js52}>
                  <Grid md={8} className={style.js51}>
                    <h4>{item.name}</h4>
                    {item.rating === "5" ? <span>{item.rating}<StarIcon sx={{width:"13px", height:"12px"}}/></span> : ""}
                  </Grid>
                  <Grid md={4}>
                    <h5>{item.job}</h5>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ))}
      </Carousel>
      <Container>
        <Container maxWidth="sm" className={style.js2}>
          <div>
            <h1 className={style.js3}>
              Find the right <i className={style.js31}>freelance</i> service,
              right away
            </h1>
          </div>
          <Search />
          <div>
            <h4 className={style.js32}>Popular:</h4>
          </div>
        </Container>
      </Container>

      <div className={style.js4}>
        <Container>
          <div>
            <ul className={style.js41}>
              <span className={style.js411}>Trusted by:</span>
              {listicons.map((icon) => (
                <li key={icon.icon} className={style.js411}>
                  <img src={icon.img} alt={icon.name} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
}
