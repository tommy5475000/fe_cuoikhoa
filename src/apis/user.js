import fetcher from "./fetcher";

//COMMENT
export const postComment = async (payload) => {
  try {
    const response = await fetcher.post("/binh-luan", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// SIGNUP
export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// SIGNIN
export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signin", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//GET USER LIST
export const getUserList = async (page) => {
  try {
    const response = await fetcher.get("/users/phan-trang-tim-kiem", {
      params: {
        pageIndex: page ||1,
        pageSize: 5,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//ADD USER
export const addUser = async (payload) => {
  try {
    const response = await fetcher.post("/users", payload);
    return response.data.content;
  } catch (error) {
    alert(error.response.data.content);
    throw error.response.data.content;
  }
};

//DELETE USER
export const deleteUser = async (id) => {
  try {
    const response = await fetcher.delete(`/users?id=${id}`);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
};

//SEARCH USER
export const searchUserList = async (TenNguoiDung) => {
  try {
    const response = await fetcher.get(`/users/search/${TenNguoiDung}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//UPDATE USER
export const upUser = async (id,userData) => {
  try {
    const response = await fetcher.put(`/users/${id}`,userData);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
