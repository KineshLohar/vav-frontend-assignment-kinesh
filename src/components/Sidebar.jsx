import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { SIDEBAR_ROUTES } from "../lib/constants";

const Sidebar = () => {
    const { logout } = useAuthStore();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileOpen(false);
    };

    // Sidebar links JSX
    const SidebarLinks = () => (
        <div>
            <h3 className='uppercase text-xs'>Employers Dashboard</h3>
            <div className='flex flex-col text-xs mt-4 ml-1'>
                {SIDEBAR_ROUTES.map((route) => {
                    const Icon = route.icon;
                    return (
                        <NavLink
                            key={route.id}
                            to={route.route}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 transition-all duration-200 tracking-wide hover:bg-indigo-50
                ${isActive && 'border-l-[3px] bg-indigo-50 border-indigo-400 text-indigo-500 font-semibold'}`
                            }
                            onClick={() => setIsMobileOpen(false)} // Close mobile drawer
                        >
                            {Icon ? (
                                <Icon size={18} className="shrink-0" />
                            ) : (
                                <div className="w-[18px] h-[18px] bg-gray-200 rounded-full" />
                            )}
                            {route.label}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile menu button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white"
                onClick={() => setIsMobileOpen(true)}
            >
                <Menu size={24} />
            </button>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 bg-opacity-30 z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`
          fixed z-50 top-0 left-0 w-72 h-screen py-4 pl-4 border-r-2 border-neutral-100 flex flex-col justify-between
          bg-white transition-transform duration-300 md:hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div>

                    <div className="flex justify-end pr-4 pb-4">
                        <button onClick={() => setIsMobileOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <SidebarLinks />
                </div>
                <button
                    type='button'
                    onClick={handleLogout}
                    className='flex items-center cursor-pointer gap-3 px-4 py-3 ml-4 text-xs font-semibold text-neutral-500 transition-all duration-200 tracking-wide hover:bg-indigo-50'
                >
                    <LogOut size={18} /> Log Out
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div className='hidden md:flex fixed z-50 left-0 w-72 h-[calc(100vh-64px)] py-4 pl-4 border-r-2 border-neutral-100 flex-col justify-between'>
                <SidebarLinks />
                <button
                    type='button'
                    onClick={handleLogout}
                    className='flex items-center cursor-pointer gap-3 px-4 py-3 ml-4 text-xs font-semibold text-neutral-500 transition-all duration-200 tracking-wide hover:bg-indigo-50'
                >
                    <LogOut size={18} /> Log Out
                </button>
            </div>
        </>
    );
};

export default Sidebar;