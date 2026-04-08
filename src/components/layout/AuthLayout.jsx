import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar'

const AuthLayout = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 min-h-screen'>
            <main className='flex flex-col items-center w-full relative lg:col-span-6'>
                <div className="fixed top-0 left-0 w-full lg:w-1/2 z-50 bg-white border-b">
                    <Navbar className='border-none' />
                </div>
                <div className='mt-20 w-full px-6'>
                    <Outlet />
                </div>
            </main>
            <div className='hidden lg:block sticky top-0 h-screen z-999 lg:col-span-6'>
                <img
                    src="/auth-image.png"
                    className='w-full h-full object-cover'
                    alt="Background"
                />
            </div>
        </div>
    )
}

export default AuthLayout