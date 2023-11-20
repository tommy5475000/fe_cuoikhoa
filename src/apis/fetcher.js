import axios from "axios";

const token = JSON.parse(localStorage.getItem("currentUser"));
const fetcher = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjI4LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTA3ODQwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA5MjI2MDAwfQ.GboZ7OZlrOvJ_T6lEZ9PfGJD8vygDn30BxaLgB43WbM",
      token: token?.token,
  },
});

fetcher.interceptors.request.use(
  (request) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
  
    if (user) {
      request.headers.Authorization = `Bearer ${user.token}`;
    }
    return request;
    
  },
  (error) => {
    //Kiểm tra nếu lỗi là 401 => token ko hợp lệ => đăng xuất user
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/sign-in");
    }
    return Promise.reject(error);
  }
);


export default fetcher;
