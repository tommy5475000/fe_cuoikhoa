import React, { useState } from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import style from "../../AdminJobs/UpdateJob/UpdateUserStyle.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { upJobRent } from "../../../../apis/jobsAPI";


const addUserSchema = object({
  maCongViec: string().required("Mã công việc không được để trống!"),
  maNguoiThue: string().required("Mã người thuê mặc định bằng 0!"),
  ngayThue: string().required("Nhập ngày tháng năm!"),
  hoanThanh: string().required("c định bằng 0!"),
});

export default function UpdateJobForRent({ item, handleCloseUpdateUser }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maCongViec: item.maCongViec,
      maNguoiThue: item.maNguoiThue,
      ngayThue: item.ngayThue,
      hoanThanh: item.hoanThanh,
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });


  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return upJobRent(item.id, values);
    },
    onSuccess: () => {
      handleCloseUpdateUser();
      Swal.fire("Thành Công!", "Đã cập nhật thông tin người dùng", "success");
      queryClient.invalidateQueries({ queryKey: ["getJobForRentList"] });
      queryClient.invalidateQueries({ queryKey: ["getDataSearch"] });
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
          error={errors.maNguoiThue}
          className={style.jss2}
          label="Mã Người Thuê"
          variant="standard"
          {...register("maNguoiThue")}
          helperText={errors.maNguoiThue?.message}
        />
      </div>
      <div>
        <TextField
          error={errors.ngayThue}
          className={style.jss2}
          label="Ngày Thuê"
          variant="standard"
          type="date"
          {...register("ngayThue")}
          helperText={errors.ngayThue?.message}
        />
      </div>

      <div style={{ display: "flex" }}>
        <TextField
          error={errors.hoanThanh}
          label="Hoàn Thành"
          className={style.jss2}
          variant="standard"
          {...register("hoanThanh")}
          helperText={errors.hoanThanh?.message}
        />


        <Button type="submit" className={style.jss3}>
          Thêm
        </Button>
      </div>
    </form>
    </div>
  );
}
