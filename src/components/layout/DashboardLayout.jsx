import { Navigate, Outlet } from "react-router";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useAuthStore } from "../../store/auth.store";

export const DashboardLayout = () => {
    const {user, isAuthenticated} = useAuthStore();

    if(!user || !isAuthenticated) return <Navigate to="/login" replace />
    return (
        <div className="w-full p-0 m-0 flex flex-col min-h-screen">
            <Navbar />
            <div className="w-full flex-1 mt-16">
                <Sidebar />
                <main className="flex-1 md:pl-72">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};