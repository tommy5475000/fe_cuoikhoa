import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../AddUser/AddUserStyle.module.scss";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upUser } from "../../../../apis/user";
import Swal from "sweetalert2";

const addUserSchema = object({
  name: string().required("Tài khoản không được để trống!"),
  email: string().required("Email không được để trống!"),
  password: string().required("Mật khẩu không được để trống!"),
  phone: string().required("Số điện thoại không được để trống!"),
  birthday: string().required("Họ tên không được để trống!"),
  gender: string().required("Giới tính của bạn"),
  role: string().required("Quyền người dùng không được để trống!"),
});

export default function UpdateUser({ item, handleCloseUpdateUser }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item.name,
      email: item.email,
      password: item.password,
      phone: item.phone,
      birthday: item.birthday,
      gender: item.gender,
      role: item.role,
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return upUser(item.id,values);

    },
    onSuccess: () => {
      handleCloseUpdateUser();
      Swal.fire("Thành Công!", "Đã cập nhật thông tin người dùng", "success");
      queryClient.invalidateQueries({ queryKey: ["getUserList"] });
      queryClient.invalidateQueries({ queryKey: ["getDataSearch"] });
    },
  });

  return (
    <div className={style.jss1}>
      <h3 style={{ textAlign: "center" }}>CẬP NHẬT THÔNG TIN</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            error={errors.name}
            className={style.jss2}
            label="Tài Khoản"
            variant="standard"
            {...register("name")}
            helperText={errors.name?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.email}
            className={style.jss2}
            label="Email"
            variant="standard"
            {...register("email")}
            helperText={errors.email?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.password}
            label="Password"
            className={style.jss2}
            variant="standard"
            {...register("password")}
            helperText={errors.password?.message}
          />
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            error={errors.phone}
            label="Số ĐT"
            className={style.jss2}
            variant="standard"
            {...register("phone")}
            helperText={errors.phone?.message}
          />
          <TextField
            error={errors.birthday}
            label="Birthday"
            className={style.jss2}
            variant="standard"
            {...register("birthday")}
            helperText={errors.birthday?.message}
          />
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            error={errors.gender}
            label="Giới Tính"
            className={style.jss2}
            variant="standard"
            {...register("gender")}
            helperText={errors.gender?.message}
          />
          <TextField
            error={errors.role}
            label="Mã loại (USER hoặc ADMIN)"
            className={style.jss2}
            variant="standard"
            {...register("role")}
            helperText={errors.role?.message}
          />
          <Button type="submit" className={style.jss3}>
            CẬP NHẬT
          </Button>
        </div>
      </form>
    </div>
  );
}
