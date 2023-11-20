import React, { useState } from "react";
import style from "./AdminNavBarStyle.module.scss";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOffIcon from '@mui/icons-material/WorkOff';
import MovieIcon from "@mui/icons-material/Movie";
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from "react-router-dom";
import ModeCommentIcon from '@mui/icons-material/ModeComment';

export default function AdminNavBar() {
//   const [showMovieTab, setShowMovieTab] = useState(false);
//   const [showUserTab, setShowUserTab] = useState(false);

//   const handleShowMovieTab = () => {
//     return setShowMovieTab(!showMovieTab);
//   };
//   const handleShowUserTab = () => {
//     return setShowUserTab(!showUserTab);
//   };

  const navigate = useNavigate();
  return (
    <div className={style.jss1}>
      <div>
        <div
          className={style.jss2}
          style={{ opacity: "0.7", marginBottom: "40px" }}
        >
          <AdminPanelSettingsIcon fontSize="large" />
          <a onClick={() => navigate("/admin")}>
            <h4>ADMIN MANAGER</h4>
          </a>
        </div>
        <div className={style.jss2}>
          <PersonOutlineIcon />
          <a onClick={() => navigate("/admin/users")}>Quản lý người dùng</a>
        </div>
        <div className={style.jss2}>
          <WorkIcon />
          <a onClick={() => navigate("/admin/jobs")}>Quản lý công việc</a>
        </div>

        <div className={style.jss2} id="user">
          <WorkOffIcon/>
          <a onClick={() => navigate("/admin/typeJobs")}>
            Quản lý loại công việc
          </a>
        </div>
        <div className={style.jss2}>
          <MovieIcon />
          <a onClick={() => navigate("/admin/jobForRent")}>Quản lý dịch vụ</a>
        </div>
        <div className={style.jss2} id="user">
          <ModeCommentIcon/>
          <a onClick={() => navigate("/admin/comments")}>
            Quản lý bình luận
          </a>
        </div>
      </div>
    </div>
  );
}
