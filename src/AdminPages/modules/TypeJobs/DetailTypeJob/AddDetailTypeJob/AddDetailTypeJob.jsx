import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addDetailTypeJob } from "../../../../../apis/jobsAPI";
import style from "./styleAddDetailTypeJob.module.scss";
const addJobSchema = object({
  tenChiTiet: string().required("Tên chi tiết không được để trống!"),
  maLoaiCongViec: string().required("Mã loại công việc không được để trống!"),
  danhSachChiTiet: string().required("Danh sách chi tiết không được để trống!"),
});

export default function AddDetailTypeJob({ handleCloseAddUser }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenChiTiet: "",
      maLoaiCongViec: 0,
      danhSachChiTiet: "",
    },
    resolver: yupResolver(addJobSchema),
    mode: "onTouched",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return addDetailTypeJob(values);
    },
    onSuccess: () => {
      Swal.fire("Thành Công!", "Đã thêm tên chi tiết công việc mới", "success");
      handleCloseAddUser();
      queryClient.invalidateQueries({ queryKey: ["getDetailTypeList"] });
    },
  });
  return (
    <div className={style.jss1}>
      <h3 style={{ textAlign: "center" }}>THÊM TÊN CHI TIẾT</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            error={errors.tenChiTiet}
            className={style.jss2}
            label="Tên Chi Tiết"
            variant="standard"
            {...register("tenChiTiet")}
            helperText={errors.tenChiTiet?.message}
          />
          <TextField
            error={errors.maLoaiCongViec}
            className={style.jss2}
            label="Mã Loại Công Việc"
            variant="standard"
            {...register("maLoaiCongViec")}
            helperText={errors.maLoaiCongViec?.message}
          />
          <TextField
            error={errors.danhSachChiTiet}
            className={style.jss2}
            label="Mã Loại Công Việc"
            variant="standard"
            {...register("danhSachChiTiet")}
            helperText={errors.danhSachChiTiet?.message}
          />

          <Button type="submit" className={style.jss3}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}
