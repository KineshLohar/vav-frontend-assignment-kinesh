import React from 'react'
import { NavLink } from 'react-router'
import { Button } from './ui/button'
import { X } from 'lucide-react'

const NotFound = () => {
    return (
        <div className='  z-50 top-0 h-[calc(100vh-160px)] bg-white w-full flex flex-col items-center justify-center gap-4'>
            <div className='p-5 bg-indigo-100 rounded-full text-indigo-400'>
                <X size={26} />
            </div>
            <h3 className='font-medium text-xl text-neutral-600'>404! Page Not Found!</h3>
            <div className='flex items-center justify-stretch gap-3'>
                <NavLink to={-1}>
                    <Button
                        className="px-9 rounded-full py-5 bg-indigo-200/60 text-indigo-500 font-medium "
                    >
                        Go Back
                    </Button>
                </NavLink>

            </div>
        </div>
    )
}

export default NotFound