
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldContent, FieldError, FieldLabel } from '../components/ui/field';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useUsersStore } from '../store/users.store';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth.store';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-z0-9_]{3,20}$/;

const contactSchema = z.object({
    identifier: z.string().transform((val) => val.toLowerCase()).refine((v) => emailRegex.test(v) || usernameRegex.test(v), "Enter a valid username or email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

const Login = () => {
    const { users } = useUsersStore();
    const { login } = useAuthStore()

    const navigate = useNavigate();
    const [showPassword, setShowpassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    });

    const onSubmit = async (values) => {
        const user = users?.find(u => (values.identifier.toLowerCase() === u.email.toLowerCase()) || (values.identifier.toLowerCase() === u.username.toLowerCase()));
        if (!user) {
          toast.error("User with this email does not exist! Please register");
          return 
        }

        if(user.password !== values.password){
            toast.error("Password is incorrect");
            return
        }

        await login(user);
        if(user.setupCompleter){
            navigate('/dashboard')
            return;
        }

        navigate('/account-setup')

    };

    return (
        <div className='max-w-lg mx-auto flex flex-col justify-center h-[calc(100vh-100px)]'>
            <h1 className='text-2xl font-medium text-neutral-600'>Log In to JobPilot</h1>
            <p className='text-neutral-600'>Don't have an account? <span className='underline'><NavLink to='/register'>Sign Up</NavLink></span></p>
            <div className='mt-8'>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <Controller
                        control={form.control}
                        name='identifier'
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState?.invalid}
                            >
                                <FieldLabel className="text-neutral-500 tracking-wider font-normal">
                                    Username or Email Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                                        type='text'
                                        aria-invalid={fieldState.invalid}
                                        className='h-10'
                                    />
                                </FieldContent>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='password'
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState?.invalid}
                            >
                                <FieldLabel className="text-neutral-500 tracking-wider font-normal">
                                    Password
                                </FieldLabel>
                                <FieldContent className='relative' >
                                    <Input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        aria-invalid={fieldState.invalid}
                                        className='h-10 text-neutral-700'
                                    />
                                    <button type='button'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowpassword((prev) => !prev)
                                        }}
                                        className='text-neutral-600 absolute right-2 top-2.5 cursor-pointer'>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                                </FieldContent>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className='flex items-center justify-end text-sm text-neutral-600'>
                        <NavLink to='/forgot-password' className='underline'>Forget your password</NavLink>
                    </div>

                    <Button className='w-full py-5 rounded-full bg-indigo-500 hover:bg-indigo-600 mt-6'>
                        Log in
                    </Button>
                </form>
            </div>

            <div className='grid grid-cols-7 items-center  text-neutral-400 px-2 mt-6'>
                <hr className='h-0.5 border-none bg-neutral-200 col-span-3' />
                <div className=' text-center text-sm font-medium col-span-1'>OR</div>
                <hr className='h-0.5 border-none bg-neutral-200 col-span-3' />
            </div>

            <div className='grid grid-cols-2 gap-4 mt-6 text-sm'>
                <button
                    type='button'
                    className='px-5 py-3 rounded-full border border-neutral-300 text-neutral-600'
                >
                    Log in with Facebook
                </button>
                <button
                    type='button'
                    className='py-3 rounded-full border border-neutral-300 text-neutral-600'
                >
                    Log in with Google
                </button>
            </div>
        </div>
    )
}

export default Login