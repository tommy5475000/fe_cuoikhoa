import React, { useState } from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import style from "../../AdminJobs/UpdateJob/UpdateUserStyle.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {  upTypeJob } from "../../../../apis/jobsAPI";


const addUserSchema = object({
  tenLoaiCongViec: string().required("Loại công việc không được để trống!"),
});

export default function UpdateTypeJob({ item, handleCloseUpdateUser }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenLoaiCongViec: item.tenLoaiCongViec,

    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });


  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return upTypeJob(item.id, values);
    },
    onSuccess: () => {
      handleCloseUpdateUser();
      Swal.fire("Thành Công!", "Đã cập nhật thông tin loại công việc", "success");
      queryClient.invalidateQueries({ queryKey: ["getTypeList"] });
      queryClient.invalidateQueries({ queryKey: ["getDataSearch"] });
    },
  });

  return (
    <div className={style.jss1}>
    <h3 style={{ textAlign: "center" }}>THÊM VIỆC LÀM MỚI</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          error={errors.tenLoaiCongViec}
          className={style.jss2}
          label="Tên Loại Công Việc"
          variant="standard"
          {...register("tenLoaiCongViec")}
          helperText={errors.tenLoaiCongViec?.message}
        />
  


        <Button type="submit" className={style.jss3}>
          Thêm
        </Button>
      </div>
    </form>
    </div>
  );
}
