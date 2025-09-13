import { Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import LoginPage from "../pages/Login"
import Home from "../pages/Home"
import SignUpPage from "../pages/SignUp"
import { useAuth } from "../context/AuthProvider"
import { STATUS } from "../constants/objects/status"
import Profile from "../pages/Profile"
import EditProfile from "../pages/EditProfile"
import CreatePost from "../pages/CreatePost"

export const PageRoutes = () => {
  const { status } = useAuth()

  return (
    <Routes>
      {status === STATUS.unauthorized ? (
        <>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit/profile" element={<EditProfile />} />
            <Route path="/create" element={<CreatePost />} />
          </Route>
          <Route path="/" element={<Navigate to="/home" replace />} />
        </>
      )}

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}
