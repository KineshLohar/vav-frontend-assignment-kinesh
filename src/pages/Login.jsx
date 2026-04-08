
import React from 'react'
import { NavLink } from 'react-router'

const Login = () => {
    return (
        <div>
            <h1>Log In to JobPilot</h1>
            <p>Don't have an account? <span className='underline'><NavLink to='/register'>Sign Up</NavLink></span></p>

            <div className='grid grid-cols-7 items-center  text-neutral-300 px-4 mt-6'>
                <hr className='h-0.5 border-none bg-neutral-200 col-span-3' />
                <div className=' text-center text-sm font-medium col-span-1'>OR</div>
                <hr className='h-0.5 border-none bg-neutral-200 col-span-3' />
            </div>

            <div className='grid grid-cols-2 gap-4 px-8 mt-6'>
                <button type='button'
                    className='px-5 py-3 rounded-full border border-neutral-300 text-neutral-600'
                >
                    Log in with Facebook
                </button>
                <button type='button'
                    className='py-3 rounded-full border border-neutral-300 text-neutral-600'
                >
                    Log in with Google
                </button>
            </div>
        </div>
    )
}

export default Login