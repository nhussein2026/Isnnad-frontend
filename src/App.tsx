import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import SubjectsPage from "./pages/dashboard/CoursesPage";
import NewTaskPage from "./pages/dashboard/NewTaskPage";
import CartPage from "./pages/dashboard/CartPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ForgetPass from "./pages/ForgetPass";
import OffersPage from "./pages/OffersPage";
import SupportPage from "./pages/SupportPage";
import CoursesPage from "./pages/dashboard/CoursesPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPass />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="new-task" element={<NewTaskPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
