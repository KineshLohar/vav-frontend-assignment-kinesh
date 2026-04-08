import { HashRouter, Navigate, Route, Routes } from "react-router"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthLayout from "./components/layout/AuthLayout"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import { useAuthStore } from "./store/auth.store"
import Login from "./pages/Login"

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<AuthLayout />}>

            <Route path='/' element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<>register</>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<>404 not found</>} />
            </Route>
          </Route>

          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
