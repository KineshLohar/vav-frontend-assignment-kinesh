
import React from 'react'
import { useAuthStore } from '../store/auth.store'
import { NavLink } from 'react-router';
import { Button } from './ui/button';
import DeleteConfirmDialog from './DeleteConfirmModal';
import { useJobsStore } from '../store/jobs.store';
import { useUsersStore } from '../store/users.store';

const Navbar = ({ className }) => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { resetDatabase } = useJobsStore();
    const { resetUsersDatabase } = useUsersStore();

    const handleCompleteReset = () => {
        logout();
        resetDatabase();
        resetUsersDatabase();
    }
    return (
        <div className={`fixed z-50 border-b-2 bg-white border-neutral-100 w-full h-16 flex items-center justify-between px-8 ${className}`}>
            <div>
                <NavLink to='/'><img src="/logo.png" className='h-6' alt="logo" /></NavLink>
            </div>
            {
                isAuthenticated && user.setupCompleted &&
                <div className='flex items-center gap-3'>
                    <DeleteConfirmDialog
                        trigger="Reset System"
                        description='This will clear all users and jobs stored on localstorage!'
                        onConfirm={handleCompleteReset}
                    />
                    <NavLink to='/post-job'>
                        <Button className='border-2 border-indigo-300 rounded-full text-sm bg-white text-indigo-500 px-5 py-4'>
                            Post a Job
                        </Button>
                    </NavLink>
                    <div className='h-8 w-8 bg-pink-300 rounded-full' />
                </div>
            }
        </div>
    )
}

export default Navbar