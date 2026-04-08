import React from 'react'
import { useAuthStore } from '../store/auth.store'
import { Navigate, Outlet } from 'react-router'; // Ensure it's react-router-dom

const ProtectedRoute = () => {
    const { user, isAuthenticated } = useAuthStore();

    // if (!isAuthenticated || !user) {
    //     return <Navigate to="/login" replace />;
    // }

    return <Outlet />;
}

export default ProtectedRoute;