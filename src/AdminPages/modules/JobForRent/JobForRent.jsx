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
import style from "../AdminJobs/AdminUserStyle.module.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteJobRent,
  getJobForRentList,
  searchJobForRentList,
} from "../../../apis/jobsAPI";
import AddJobForRent from "./AddJobForRent/AddJobForRent";
import UpdateJobForRent from "./UpdateJobForRent/UpdateJobForRent";

const columns = [
  { name: "Mã Công Việc", width: 250 },
  { name: "Mã Người Thuê", width: 250 },
  { name: "Ngày Thuê", width: 250 },
  { name: "Hoàn Thành", width: 250 },
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

  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const handleOpenUpdateUser = (item) => {
    setItem(item);
    return setOpenModalUpdateUser(true);
  };
  const handleCloseUpdateUser = () => {
    return setOpenModalUpdateUser(false);
  };

  const { data } = useQuery({
    queryKey: ["getJobForRentList", searchParams.get("page")],
    queryFn: () => getJobForRentList(searchParams.get("page")),
  });
console.log(data);
  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => {
      return deleteJobRent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getJobForRentList"] });
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
        <InputBase
          placeholder="Tìm kiếm công việc..."
          onKeyDown={handleSearch}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={style.jss2}>
          <AddIcon />
          <Button style={{ color: "white" }} onClick={handleOpenAddUser}>
            THÊM CÔNG VIỆC
          </Button>
        </div>
      </div>
      <div style={{ height: "100%", maxWidth: "100%" }}>
        <TableContainer>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((colum) => {
                  return (
                    <TableCell key={colum.name} width={colum.width}>
                      {colum.name}
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
                        <TableCell>{item.data.maCongViec}</TableCell>
                        <TableCell>{item.data.maNguoiThue}</TableCell>
                        <TableCell>{item.data.ngayThue}</TableCell>
                        <TableCell>{item.data.hoanThanh}</TableCell>

                        <TableCell>
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
                              handleDelete(item.taiKhoan);
                            }}
                          >
                            <DeleteIcon /> Xóa
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : data?.data.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{item.maCongViec}</TableCell>
                        <TableCell>${item.maNguoiThue}</TableCell>
                        <TableCell>{item.ngayThue}</TableCell>
                        <TableCell>{item.hoanThanh}</TableCell>

                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <Grid>
            {searchTerm
              ? pagesSearch.map((page, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() => {
                        handleChangePage(page);
                      }}
                    >
                      {page}
                    </Button>
                  );
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
        <AddJobForRent handleCloseAddUser={handleCloseAddUser} />
      </Modal>
      <Modal
        sx={styleModal}
        open={openModalUpdateUser}
        onClose={handleCloseUpdateUser}
      >
        <UpdateJobForRent
          handleCloseUpdateUser={handleCloseUpdateUser}
          item={item}
        />
      </Modal>
    </div>
  );
}
