import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./AddUserStyle.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../../../apis/user";
import Swal from "sweetalert2";
import { CheckBox } from "@mui/icons-material";

const addUserSchema = object({
  name: string().required("Tài khoản không được để trống!"),
  email: string().required("Email không được để trống!"),
  password: string().required("Mật khẩu không được để trống!"),
  phone: string().required("Số điện thoại không được để trống!"),
  birthday: string().required("Họ tên không được để trống!"),
  gender: string().required("Giới tính của bạn"),
  role: string().required("Quyền người dùng không được để trống!"),
});

export default function AddUser({ handleCloseAddUser }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
      skill: [""],
      certification: [""],
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });
  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return addUser(values);
    },
    onSuccess: () => {
      Swal.fire("Thành Công!", "Đã thêm người dùng mới", "success");
      handleCloseAddUser();
      queryClient.invalidateQueries({ queryKey: ["getUserList"] });
    },
  });

  return (
    <div className={style.jss1}>
      <h3 style={{ textAlign: "center" }}>THÊM NGƯỜI DÙNG MỚI</h3>
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
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={<CheckBox {...register("gender")} color="primary" />}
              label="Male"
            />
            <FormControlLabel
              control={<Checkbox {...register("gender")} color="primary" />}
              label="Female"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <TextField
            error={errors.role}
            label="Mã loại (USER hoặc ADMIN)"
            className={style.jss2}
            variant="standard"
            {...register("role")}
            helperText={errors.role?.message}
          />

          <Button type="submit" className={style.jss3}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}
