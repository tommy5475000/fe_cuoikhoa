import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { getCommentJob } from "../../../../../apis/jobsAPI";
import { Button, Grid, Input } from "@mui/material";
import style from "./styleComment.module.scss";
import StarIcon from "@mui/icons-material/Star";
import { postComment } from "../../../../../apis/user";
import { useUserContext } from "../../../../../context/UserContext";

export default function Comment() {
  const { currentUser } = useUserContext();

  const navigate = useNavigate();
  const { id } = useParams();
  const { data = [], refetch } = useQuery({
    queryKey: ["Comment", id],
    queryFn: () => getCommentJob(id),
  });

  const maCongViec = id;
  const maNguoiBinhLuan = currentUser?.user?.id;
  const currentDate = new Date();
  const ngayBinhLuan = currentDate.toLocaleDateString();
  const [noiDung, setNoiDung] = useState("");
  const saoBinhLuan = 10;

  const { mutate: handlePost } = useMutation({
    mutationFn: (payload) => postComment(payload),
    onSuccess: () => {
      refetch()
    },
  });
  const location = useLocation();
  const handlePostComment = () => {
    if (!currentUser) {
      // User chưa đăng nhập, bạn có thể thực hiện việc chuyển hướng đến trang login
      const url = `/sign-in?redirectTo=${location.pathname}`;
      // user chưa đăng nhập => redirect về trang login
      navigate(url);
    }
    const commentData = {
      maCongViec,
      maNguoiBinhLuan,
      ngayBinhLuan,
      noiDung,
      saoBinhLuan,
    };

    handlePost(commentData);
  };

  return (
    <Grid className={style.js1}>
      {data.map((item) => (
        <Grid key={item.id} className={style.js2}>
          <Grid container>
            <Grid>
              <img src={item.avatar} alt="" className={style.js21} />
            </Grid>
            <Grid className={style.js22}>
              <Grid container>
                <Grid className={style.js23}>{item.tenNguoiBinhLuan}</Grid>
                <Grid className={style.js24}>
                  <StarIcon /> <h3>{item.saoBinhLuan}</h3>{" "}
                </Grid>
              </Grid>
              <Grid className={style.js25}>
                <p>{item.noiDung}</p>
              </Grid>
              <Grid>{item.ngayBinhLuan}</Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}

      {/* POST COMMENT */}
      <Grid>
        <Grid>
          <Input
            placeholder="Nhập nội dung bình luận..."
            className={style.js3}
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
          ></Input>
        </Grid>
        <Grid className={style.js4}>
          <Button className={style.js41} onClick={handlePostComment}>
            Add Comment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
