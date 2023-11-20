import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import style from "./styleComment.module.scss";
import { deleteComment, getComment } from "../../../apis/commentAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UpdateComment from "./UpdateComment";
import AddComment from "./AddComment/AddComment";

const columns = [
  { name: "Mã Công Việc", width: 200 },
  { name: "Mã Người Bình Luận", width: 250 },
  { name: "Ngày Bình Luận", width: 250 },
  { name: "Nội Dung", width: 300 },
  { name: "Sao Bình Luận", width: 200 },
  { name: "", width: 200 },
];

const styleModal = {
  border: "none",
  backgroundColor: "tranferant",
  width: "450px",
  height: "auto",
  top: "5%",
  left: "35%",
};

export default function Comments() {
  const [pageNumber, setPageNumber] = useState(1); // Số trang hiện tại
  const itemsPerPage = 10; // Số lượng mục trên mỗi trang
  const [item, setItem] = useState({});

  const [openModalAddComment, setOpenModalAddComment] = useState(false);
  const handleOpenAddComment = () => {
    return setOpenModalAddComment(true);
  };
  const handleCloseAddComment = () => {
    return setOpenModalAddComment(false);
  };

  const [openModalUpdateComment, setOpenModalUpdateComment] = useState(false);
  const handleOpenUpdateComment = (item) => {
    setItem(item);
    return setOpenModalUpdateComment(true);
  };
  const handleCloseUpdateComment = () => {
    return setOpenModalUpdateComment(false);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getComment", pageNumber],
    queryFn: () => getComment(pageNumber),
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => {
      return deleteComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComment"] });
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


  const queryClient = useQueryClient();

  // Số trang dựa trên số lượng dữ liệu
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleChangePage = (page) => {
    setPageNumber(page);
  };

  const paginatedData = data?.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <div className={style.jss1}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={style.jss2}>
          <AddIcon />
          <Button style={{ color: "white" }} onClick={handleOpenAddComment}>THÊM COMMENT</Button>
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
                      <h3>{colum.name}</h3>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.maCongViec}</TableCell>
                    <TableCell>{item.maNguoiBinhLuan}</TableCell>
                    <TableCell>{item.ngayBinhLuan}</TableCell>
                    <TableCell>{item.noiDung}</TableCell>
                    <TableCell>{item.saoBinhLuan}</TableCell>
                    <TableCell>
                      <a
                        className={style.jss4}
                        onClick={() => {
                          handleOpenUpdateComment(item);
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => {
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
              }
            )}
          </Grid>
        </TableContainer>
      </div>

      <Modal
      sx={styleModal}
      open={openModalAddComment}
      onClose={handleCloseAddComment}
    >
      <AddComment handleCloseAddComment={handleCloseAddComment} />
    </Modal>
      <Modal
        sx={styleModal}
        open={openModalUpdateComment}
        onClose={handleCloseUpdateComment}
      >
        <UpdateComment
          handleCloseUpdateComment={handleCloseUpdateComment}
          item={item}
        />
      </Modal>
    </div>
  );
}
