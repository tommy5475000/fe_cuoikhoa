import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./HomePages";
import HomeLayout from "./HomePages/layouts/MainLayout/HomeLayout";
import SignIn from "./Auth/pages/SignIn";
import SignUp from "./Auth/pages/SignUp";
import Jobs from "./HomePages/Jobs";
import Job from "./HomePages/Jobs/JobsDetail/Job";
import JobInfor from "./HomePages/Jobs/JobsDetail/Job/JobInfor";
import UserProvider from "./context/UserContext";
import AdminProtextedRoute from "./routers/AdminProtectedRoute";
import AdminLayout from "./AdminPages/layouts/MainLayout/AdminLayout";
import AdminHome from "./AdminPages/components/AdminHome";
import AdminUser from "./AdminPages/modules/AdminUser/AdminUser";
import TypeJobs from "./AdminPages/modules/TypeJobs";
import AdminJobs from "./AdminPages/modules/AdminJobs";
import JobForRent from "./AdminPages/modules/JobForRent";
import Comments from "./AdminPages/modules/Comments";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePages />} />
            <Route path="types/:jobtype/:id" element={<Jobs />} />
            <Route path="job/:jobtype/:id" element={<Job />} />
            <Route path="jobinfor/:id" element={<JobInfor />} />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* ADMIN PAGE */}
          <Route element={<AdminProtextedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="/admin/users" element={<AdminUser />} />
              <Route path="/admin/typeJobs" element={<TypeJobs />} /> 
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/jobForRent" element={<JobForRent />} />
              <Route path="/admin/comments" element={<Comments />} />

            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
