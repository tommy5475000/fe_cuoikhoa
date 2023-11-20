import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Grid,
  InputBase,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import style from "./styleTypeJobs.module.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { deleteTypeJob, getTypeList } from "../../../apis/jobsAPI";
import UpdateTypeJob from "./UpdateTypeJob/UpdateTypeJob";
import AddTypeJob from "./AddTypeJob";
import DetailTypeJob from "./DetailTypeJob";

const columns = [
  { name: "Tên loại công việc", width: "50%" },
  { name: "Chi tiết loại công việc", width: "50%" },
];

const styleModal = {
  border: "none",
  backgroundColor: "tranferant",
  width: "450px",
  height: "auto",
  top: "5%",
  left: "35%",
};

export default function AdminUser() {
  const [searchTerm, setSearchTerm] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [item, setItem] = useState({});

  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const handleOpenAddUser = () => {
    return setOpenModalAddUser(true);
  };
  const handleCloseAddUser = () => {
    return setOpenModalAddUser(false);
  };

  const [openModalAddDetailType, setOpenModalAddDetailType] = useState(false);
  const handleOpenAddDetailType = () => {
    return setOpenModalAddDetailType(true);
  };
  const handleCloseAddDetailType = () => {
    return setOpenModalAddDetailType(false);
  };

  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const handleOpenUpdateUser = (item) => {
    setItem(item);
    return setOpenModalUpdateUser(true);
  };
  const handleCloseUpdateUser = () => {
    return setOpenModalUpdateUser(false);
  };


  const { data } = useQuery({
    queryKey: ["getTypeList", searchParams.get("page")],
    queryFn: () => getTypeList(searchParams.get("page")),
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => {
      return deleteTypeJob(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTypeList"] });
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

  //Tìm kiếm người dùng
  const handleSearch = (evt) => {
    if (evt.key === "Enter") {
      setSearchTerm(evt.target.value);
    }
  };

  const queryClient = useQueryClient();
  const totalPages = Math.ceil(data?.totalRow / 5);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const totalPagesSearch = Math.ceil(data?.totalRow / 5);
  const pagesSearch = Array.from(
    { length: totalPagesSearch },
    (_, index) => index + 1
  );

  const handleChangePage = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return (
    <div className={style.jss1}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchIcon />
        <InputBase placeholder="Tìm kiếm..." onKeyDown={handleSearch} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={style.jss2}>
          <AddIcon />
          <Button style={{ color: "white" }} onClick={handleOpenAddUser}>
            THÊM LOẠI CÔNG VIỆC
          </Button>
        </div>
        <div className={style.jss2}>
          <AddIcon />
          <Button style={{ color: "white" }} onClick={handleOpenAddDetailType}>
            THÊM CHI TIẾT LOẠI CÔNG VIỆC
          </Button>
        </div>
      </div>
      <div style={{ height: "100%", maxWidth: "100%" ,display: "flex", justifyContent: "space-between"}}>
        <TableContainer>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead > 
              <TableRow >
                {columns.map((colum) => {
                  return (
                    <TableCell key={colum.name} width={colum.width} >
                      <h3>{colum.name}</h3>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchTerm
                ? data?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell >
                          <Grid container className={style.jss3}>
                            <Grid item md={6}>
                              {item.tenLoaiCongViec}
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
                        </TableCell>

                        <TableCell>
                          <DetailTypeJob id={item.id} />
                          
                        </TableCell>
                      </TableRow>
                    );
                  })
                : data?.data.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell >
                          <Grid container className={style.jss3}>
                            <Grid item >
                              {item.tenLoaiCongViec}
                            </Grid>
                            <Grid item className={style.jss31}>
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
                        </TableCell>

                        <TableCell className={style.jss1}>
                          <DetailTypeJob id={item.id} openModalAddDetailType={openModalAddDetailType} handleCloseAddDetailType={handleCloseAddDetailType}  />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <Grid>
            {searchTerm
              ? pagesSearch.map((page, index) => {
                  return;
                })
              : pages.map((page) => {
                  return (
                    <Button
                      key={page}
                      onClick={() => {
                        handleChangePage(page);
                      }}
                    >
                      {page}
                    </Button>
                  );
                })}
          </Grid>
        </TableContainer>
      </div>

      <Modal
        sx={styleModal}
        open={openModalAddUser}
        onClose={handleCloseAddUser}
      >
        <AddTypeJob handleCloseAddUser={handleCloseAddUser} />
      </Modal>
      <Modal
        sx={styleModal}
        open={openModalUpdateUser}
        onClose={handleCloseUpdateUser}
      >
        <UpdateTypeJob
          handleCloseUpdateUser={handleCloseUpdateUser}
          item={item}
        />
      </Modal>
    </div>
  );
}
