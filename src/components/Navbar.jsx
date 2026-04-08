
import React from 'react'
import { useAuthStore } from '../store/auth.store'
import { NavLink } from 'react-router';

const Navbar = ({ className }) => {
    const { isAuthenticated } = useAuthStore();
    return (
        <div className={`fixed z-50 border-b-2 border-neutral-100 w-full h-16 flex items-center justify-between px-8 ${className}`}>
            <div>
                <NavLink to='/'><img src="/logo.png" className='h-6' alt="logo" /></NavLink>
            </div>
            {
                isAuthenticated &&
                <div>
                    <button></button>
                    <div>Profile</div>
                </div>
            }
        </div>
    )
}

export default Navbar