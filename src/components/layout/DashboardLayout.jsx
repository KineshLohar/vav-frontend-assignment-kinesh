import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export const DashboardLayout = () => {
    return (
        <div className="w-full p-0 m-0 flex flex-col min-h-screen">
            <Navbar />
            <div className="w-full flex-1 mt-16">
                <Sidebar />
                <main className="flex-1 pl-72">
                    <Outlet /> {/* Child routes render here */}
                </main>
            </div>
        </div>
    );
};