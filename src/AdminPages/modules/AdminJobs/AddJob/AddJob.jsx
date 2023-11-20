import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./AddUserStyle.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addJob } from "../../../../apis/jobsAPI";

const addJobSchema = object({
  tenCongViec: string().required("Tài khoản không được để trống!"),
  danhGia: string().required("Đánh giá mặc định bằng 0!"),
  giaTien: string().required("Giá tiền mặc định bằng 0!"),
  nguoiTao: string().required("Người tạo mặc định bằng 0!"),
  hinhAnh: string().required("Vui lòng thêm hình ảnh!"),
  moTa: string().required("Vui lòng thêm mô tả!"),
  moTaNgan: string().required("Vui lòng thêm mô tả!"),
  maChiTietLoaiCongViec: string().required("Mã chi tiết loại công việc"),
  saoCongViec: string().required("Sao công việc mặc định bằng 0!"),
});

export default function AddJob({ handleCloseAddUser }) {
  const queryClient = useQueryClient();

  const [imgPreview, setImgPreview] = useState(""); // State để lưu trữ URL hình ảnh

  const handleChange = (event) => {
    // Xử lý sự kiện thay đổi khi người dùng chọn hình ảnh
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPreview(reader.result); // Cập nhật URL hình ảnh vào state
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Đọc file và trả về URL của hình ảnh
    }
  };

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenCongViec: "",
      danhGia: 0,
      giaTien: 0,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: 0,
      moTaNgan: "",
      saoCongViec: 0,
    },
    resolver: yupResolver(addJobSchema),
    mode: "onTouched",
  });


  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      return addJob(values);
    },
    onSuccess: () => {
      Swal.fire("Thành Công!", "Đã thêm người dùng mới", "success");
      handleCloseAddUser();
      queryClient.invalidateQueries({ queryKey: ["getJobList"] });
    },
  });

  return (
    <div className={style.jss1}>
      <h3 style={{ textAlign: "center" }}>THÊM NGƯỜI DÙNG MỚI</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            error={errors.tenCongViec}
            className={style.jss2}
            label="Tên Công Việc"
            variant="standard"
            {...register("tenCongViec")}
            helperText={errors.tenCongViec?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.giaTien}
            className={style.jss2}
            label="Giá Tiền"
            variant="standard"
            {...register("giaTien")}
            helperText={errors.giaTien?.message}
          />
        </div>
        <div>
          <TextField
            error={errors.hinhAnh}
            className={style.jss2}
            label="Hình Ảnh"
            variant="standard"
            {...register("hinhAnh")}
            helperText={errors.hinhAnh?.message}
          />
           {imgPreview && <img src={imgPreview} alt="Preview" />} {/* Hiển thị hình ảnh nếu có URL */}
        </div>

        <div style={{ display: "flex" }}>
          <TextField
            error={errors.moTa}
            label="Mô Tả"
            className={style.jss2}
            variant="standard"
            {...register("moTa")}
            helperText={errors.moTa?.message}
          />
          <TextField
            error={errors.moTaNgan}
            label="Mô Tả Ngắn"
            className={style.jss2}
            variant="standard"
            {...register("moTaNgan")}
            helperText={errors.moTaNgan?.message}
          />
        </div>

        <div style={{ display: "flex" }}>
          <TextField
            error={errors.maChiTietLoaiCongViec}
            label="Mã Chi Tiết Loại Công Việc"
            className={style.jss2}
            variant="standard"
            {...register("maChiTietLoaiCongViec")}
            helperText={errors.maChiTietLoaiCongViec?.message}
          />

          <Button type="submit" className={style.jss3}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}
