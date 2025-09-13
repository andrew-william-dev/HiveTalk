import { Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import LoginPage from "../pages/Login"
import Home from "../pages/Home"
import SignUpPage from "../pages/SignUp"

export const PageRoutes = () => {
    return (
        <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    )
}