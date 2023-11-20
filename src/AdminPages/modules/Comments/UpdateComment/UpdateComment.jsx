import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import style from "./styleUpdateComment.module.scss";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpComment } from "../../../../apis/commentAPI";

const addUserSchema = object({
  maCongViec: string().required("Mã công việc không được để trống!"),
  maNguoiBinhLuan: string().required("Mã người bình luận mặc định bằng 0!"),
  ngayBinhLuan: string().required("Nhập ngày tháng năm!"),
  noiDung: string().required("Vui lòng nhập nội dung!"),
  saoBinhLuan: string().required("Vui lòng cho than điểm đánh giá"),
});

export default function UpdateComment({ item, handleCloseUpdateComment }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maCongViec: item.maCongViec,
      maNguoiBinhLuan: item.maNguoiBinhLuan,
      ngayBinhLuan: item.ngayBinhLuan,
      noiDung: item.noiDung,
      saoBinhLuan: item.saoBinhLuan,
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return UpComment(item.id, values);
    },
    onSuccess: () => {
      handleCloseUpdateComment();
      Swal.fire("Thành Công!", "Đã cập nhật thông tin người dùng", "success");
      queryClient.invalidateQueries({ queryKey: ["getComment"] });
    },
  });

  return (
    <div className={style.jss1}>
      <h3 style={{ textAlign: "center" }}>THÊM VIỆC LÀM MỚI</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            error={errors.maCongViec}
            className={style.jss2}
            label="Mã Công Việc"
            variant="standard"
            {...register("maCongViec")}
            helperText={errors.maCongViec?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.maNguoiBinhLuan}
            className={style.jss2}
            label="Mã Người Bình Luận"
            variant="standard"
            {...register("maNguoiBinhLuan")}
            helperText={errors.maNguoiBinhLuan?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.ngayBinhLuan}
            className={style.jss2}
            label="Ngày Bình Luận"
            variant="standard"
            type="date"
            {...register("ngayBinhLuan")}
            helperText={errors.ngayBinhLuan?.message}
          />
        </div>

        <div style={{ display: "flex" }}>
          <TextField
            error={errors.noiDung}
            label="Nội Dung"
            className={style.jss2}
            variant="standard"
            {...register("noiDung")}
            helperText={errors.noiDung?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.saoBinhLuan}
            label="Đánh Giá"
            className={style.jss2}
            variant="standard"
            {...register("saoBinhLuan")}
            helperText={errors.saoBinhLuan?.message}
          />

          <Button type="submit" className={style.jss3}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}
