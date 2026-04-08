import React from 'react'
import { SIDEBAR_ROUTES } from '../lib/CONSTANTS'
import { NavLink } from 'react-router'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '../store/auth.store'

const Sidebar = () => {
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='fixed z-50 left-0 w-72 h-[calc(100vh-64px)] py-4 pl-4 border-r-2 border-neutral-100 flex flex-col justify-between'>

            <div className='flex flex-col text-neutral-500 font-medium'>
                <h3 className=' uppercase text-xs'>Employers Dashboard</h3>
                <div className=' flex flex-col text-xs mt-4 ml-1'>
                    {
                        SIDEBAR_ROUTES.map((route) => {
                            const Icon = route.icon;
                            return (
                                <NavLink
                                    key={route.id}
                                    to={route.route}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 transition-all duration-200 
                                        tracking-wide hover:bg-indigo-50-
                                        ${isActive
                                        && 'border-l-[3px] bg-indigo-50 border-indigo-400 text-indigo-500 font-semibold'
                                        }`}
                                >
                                    {
                                        Icon ? (
                                            <Icon size={18} className="shrink-0" />
                                        ) : (
                                            <div className="w-[18px] h-[18px] bg-gray-200 rounded-full" /> // Placeholder if missing
                                        )}
                                    {route.label}
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>

            <button
                type='button'
                onClick={() => handleLogout()}
                className={`flex items-center cursor-pointer gap-3 px-4 py-3 ml-4 text-xs font-semibold text-neutral-500 transition-all duration-200 
                tracking-wide hover:bg-indigo-50-
                `}
            >
                <LogOut size={18} /> Log Out
            </button>
        </div>
    )
}

export default Sidebar