import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import React from "react";
import style from "./styleSignUp.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../apis/user";

const signupSchema = object({
  name: string().required("Tài khoản không được để trống"),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  password: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  phone: string().required("Số điện thoại không được để trống"),
  birthday: string().required("Họ tên không được để trống"),
  gender: string().required("Xin vui lòng chọn giới tính"),
});

export default function SignUp() {
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
      gender: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    handleSignup(values);
  };

  return (
    <div className={style.backgroud}>
      <Grid sx={{ mx: 65 }}>
        <Container maxWidth="xs">
          <Grid>
            <Grid container>
              <Grid className={style.form}>
                <div className={style.js1}>
                  <Avatar className={style.icon}>
                    <LockOpenIcon fontSize="medium" />
                  </Avatar>
                  <h3 className={style.h3}>Đăng Ký</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "40ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label="Tài Khoản"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Mật Khẩu"
                      type="password"
                      {...register("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Số điện thoại"
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                    <TextField
                      id="outlined-basic"
                      label=""
                      type="date"
                      {...register("birthday")}
                      error={!!errors.birthday}
                      helperText={errors.birthday?.message}
                    />

                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={true}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Nam"
                          {...register("gender")}
                          error={!!errors.gender}
                          helperText={errors.gender?.message}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Nữ"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  <div>{error && <p>{error}</p>}</div>

                  <Button
                    className={style.signButton}
                    type="submit"
                    disabled={isLoading}
                  >
                    Đăng Ký
                  </Button>

                  <div
                    className={style.js2}
                    onClick={() => navigate("/sign-in")}
                  >
                    Bạn đã có tài khoản? Đăng Nhập
                  </div>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
}
