import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "../../AdminJobs/AddJob/AddUserStyle.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addJobRent } from "../../../../apis/jobsAPI";


const addJobSchema = object({
  maCongViec: string().required("Mã công việc không được để trống!"),
  maNguoiThue: string().required("Mã người thuê mặc định bằng 0!"),
  ngayThue: string().required("Nhập ngày tháng năm!"),
  hoanThanh: string().required("c định bằng 0!"),
  
});

export default function AddJobForRent({ handleCloseAddUser }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: true,
    },
    resolver: yupResolver(addJobSchema),
    mode: "onTouched",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return addJobRent(values);
    },
    onSuccess: () => {
      Swal.fire("Thành Công!", "Đã thêm người dùng mới", "success");
      handleCloseAddUser();
      queryClient.invalidateQueries({ queryKey: ["getJobForRentList"] });
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
