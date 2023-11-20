import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "../../AdminJobs/AddJob/AddUserStyle.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addTypeJob } from "../../../../apis/jobsAPI";


const addJobSchema = object({
  tenLoaiCongViec: string().required("Loại công việc không được để trống!"),
  
});

export default function AddTypeJob({ handleCloseAddUser }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      tenLoaiCongViec: "",

    },
    resolver: yupResolver(addJobSchema),
    mode: "onTouched",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return addTypeJob(values);
    },
    onSuccess: () => {
      Swal.fire("Thành Công!", "Đã thêm loại công việc mới", "success");
      handleCloseAddUser();
      queryClient.invalidateQueries({ queryKey: ["getTypeList"] });
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
