import { HashRouter, Navigate, Route, Routes } from "react-router"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthLayout from "./components/layout/AuthLayout"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import { useAuthStore } from "./store/auth.store"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import Register from "./pages/Register"
import AccountSetup from "./pages/AccountSetup"
import NotFound from "./components/NotFound"
import Jobs from "./pages/Jobs"
import PostAJob from "./pages/PostAJob"
import EditJob from "./pages/EditJob"
import JobDetails from "./pages/JobDetails"

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<AuthLayout showImage={true} />}>

            <Route path='/' element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route element={<AuthLayout className='lg:grid-cols-6' showImage={false} />}>
            <Route path='/account-setup' element={<AccountSetup />} />
          </Route>
          

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post-job" element={<PostAJob />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/jobs/:id/edit" element={<EditJob />} />
              {/* <Route path="*" element={<>404 not found</>} /> */}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </>
  )
}

export default App
