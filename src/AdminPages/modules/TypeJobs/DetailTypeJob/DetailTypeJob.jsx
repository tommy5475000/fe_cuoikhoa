import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {  Grid, Modal } from "@mui/material";
import style from "../styleTypeJobs.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import React, { useState } from "react";
import {
  deleteDetailTypeJob,
  getDetailTypeList,
} from "../../../../apis/jobsAPI";
import AddDetailTypeJob from "./AddDetailTypeJob/AddDetailTypeJob";
import UpdateDetailTypeJob from "./UpdateDetailTypeJob/UpdateDetailTypeJob";

const styleModalDetail = {
  border: "none",
  backgroundColor: "tranferant",
  width: "450px",
  height: "auto",
  top: "5%",
  left: "35%",
};

export default function DetailTypeJob({ id ,handleCloseAddDetailType,openModalAddDetailType}) {
  console.log(id);
  const [item, setItem] = useState({});

  const [openModalAddUser, setOpenModalAddUser] = useState(false);

  const handleOpenAddUser = () => {
    return setOpenModalAddUser(true);
  };
  const handleCloseAddUser = () => {
    return setOpenModalAddUser(false);
  };

  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const handleOpenUpdateUser = (item) => {
    setItem(item);
    return setOpenModalUpdateUser(true);
  };
  const handleCloseUpdateUser = () => {
    return setOpenModalUpdateUser(false);
  };

  const { data = [] } = useQuery({
    queryKey: ["getDetailTypeList"],
    queryFn: getDetailTypeList,
  });

  const jobDetailType = data.find((item) => item.maLoaiCongviec === id);
  console.log(jobDetailType);

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => {
      return deleteDetailTypeJob(id);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["getDetailTypeList"] });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: `Bạn muốn xóa tài khoản ${id}?`,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  return (
    <div >
      <div style={{ height: "100%", maxWidth: "100%" }}>
        {jobDetailType?.tenNhom === undefined ? (
          <Grid></Grid>
        ) : (
          <Grid>
            <Grid>
              {jobDetailType?.dsChiTietLoai.map((item) => (
                <Grid container className={style.jss3}>
                  <Grid item md={6}>
                    {item.tenChiTiet}
                  </Grid>
                  <Grid item md={6} className={style.jss31}>
                    <a
                      className={style.jss4}
                      onClick={() => {
                        handleOpenUpdateUser(item);
                      }}
                    >
                      <EditIcon /> Sửa
                    </a>
                    <a
                      className={style.jss5}
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <DeleteIcon /> Xóa
                    </a>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </div>

      <Modal
        sx={styleModalDetail}
        open={openModalAddDetailType}
        onClose={handleCloseAddDetailType}
      >
        <AddDetailTypeJob handleCloseAddDetailType={handleCloseAddDetailType} />
      </Modal>

      <Modal
        sx={styleModalDetail}
        open={openModalUpdateUser}
        onClose={handleCloseUpdateUser}
      >
        <UpdateDetailTypeJob
          handleCloseAddDetailType={handleCloseAddDetailType}
          item={item}
        />
      </Modal>
    </div>
  );
}
