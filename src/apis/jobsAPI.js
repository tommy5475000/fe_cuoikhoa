import fetcher from "./fetcher";

//LẤY MENU
export async function getMenuJobs() {
  try {
    const response = await fetcher.get("/cong-viec/lay-menu-loai-cong-viec");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

// LẤY CHI TIẾT LOẠI CÔNG VIỆC
export async function getDetailsJobs(MaLoaiCongViec) {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-chi-tiet-loai-cong-viec/${MaLoaiCongViec}`
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// LẤY CÔNG VIỆC THEO CHI TIẾT LOẠI
export async function getJob(MaChiTietLoai) {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${MaChiTietLoai}`
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// LẤY CÔNG VIỆC CHI TIẾT
export async function getDetailJob(MaCongViec) {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-cong-viec-chi-tiet/${MaCongViec}`
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// LẤY BÌNH LUẬN THEO MÃ CÔNG VIỆC
export async function getCommentJob(MaCongViec) {
  try {
    const response = await fetcher.get(
      `/binh-luan/lay-binh-luan-theo-cong-viec/${MaCongViec}`
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// THUÊ CÔNG VIỆC
export const bookJob = async (payload) => {
  try {
    const response = await fetcher.post("/thue-cong-viec", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//ADMIN
//GET LOẠI CÔNG VIỆC LIST
export const getTypeList = async (page) => {
  try {
    const response = await fetcher.get("/loai-cong-viec/phan-trang-tim-kiem", {
      params: {
        pageIndex: page || 1,
        pageSize: 5,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//DELETE TYPE JOB
export const deleteTypeJob = async (id) => {
  try {
    const response = await fetcher.delete(`loai-cong-viec/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//UPDATE TYPE JOB
export const upTypeJob = async (id, userData) => {
  try {
    const response = await fetcher.put(`/loai-cong-viec/${id}`, userData);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//ADD TYPE JOB
export const addTypeJob = async (payload) => {
  try {
    const response = await fetcher.post("/loai-cong-viec", payload);
    return response.data?.content;
  } catch (error) {
    alert(error.response.data.content);
    throw error.response.data.content;
  }
};

// GET DETAIL TYPE JOB
export const getDetailTypeList = async () => {
  try {
    const response = await fetcher.get("/chi-tiet-loai-cong-viec/");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//DELETE DETAIL TYPE JOB
export const deleteDetailTypeJob = async (id) => {
  try {
    const response = await fetcher.delete(`chi-tiet-loai-cong-viec/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//ADD DETAIL JOB
export const addDetailTypeJob = async (payload) => {
  try {
    const response = await fetcher.post("/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai/", payload);
    return response.data?.content;
  } catch (error) {
    alert(error.response.data.content);
    throw error.response.data?.content;
  }
};


//GET LIST JOB
export const getJobList = async (page) => {
  try {
    const response = await fetcher.get("/cong-viec/phan-trang-tim-kiem", {
      params: {
        pageIndex: page || 1,
        pageSize: 5,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//SEARCH JOB
export const searchJobList = async (TenCongViec) => {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//DELETE JOB
export const deleteJob = async (id) => {
  try {
    const response = await fetcher.delete(`/cong-viec/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//ADD JOB
export const addJob = async (payload) => {
  try {
    const response = await fetcher.post("/cong-viec", payload);
    return response.data?.content;
  } catch (error) {
    alert(error.response.data.content);
    throw error.response.data.content;
  }
};

//UPDATE JOB
export const upJob = async (id, userData) => {
  try {
    const response = await fetcher.put(`/cong-viec/${id}`, userData);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//FOR RENT
//GET LIST CÔNG VIỆC
export const getJobForRentList = async (page) => {
  try {
    const response = await fetcher.get("/thue-cong-viec/phan-trang-tim-kiem", {
      params: {
        pageIndex: page || 1,
        pageSize: 5,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//DELETE JOBRENT
export const deleteJobRent = async (id) => {
  try {
    const response = await fetcher.delete(`thue-cong-viec/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//ADD JOBRENT
export const addJobRent = async (payload) => {
  try {
    const response = await fetcher.post("/thue-cong-viec", payload);
    return response.data?.content;
  } catch (error) {
    alert(error.response.data.content);
    throw error.response.data.content;
  }
};

//UPDATE JOBRENT
export const upJobRent = async (id, userData) => {
  try {
    const response = await fetcher.put(`/thue-cong-viec/${id}`, userData);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//SEARCH JOBRENT
export const searchJobForRentList = async (id) => {
  try {
    const response = await fetcher.get("thue-cong-viec/lay-danh-sach-da-thue");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
