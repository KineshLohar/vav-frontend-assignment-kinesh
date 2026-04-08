
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink } from 'react-router';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldContent, FieldError, FieldLabel } from '../components/ui/field';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

const contactSchema = z.object({
    identifier: z.string().refine((v) => emailRegex.test(v) || usernameRegex.test(v), "Enter a valid username or email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

const Login = () => {
    const [showPassword, setShowpassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    });

    const onSubmit = (values) => {

    };

    return (
        <div className='max-w-lg mx-auto'>
            <h1>Log In to JobPilot</h1>
            <p>Don't have an account? <span className='underline'><NavLink to='/register'>Sign Up</NavLink></span></p>
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        control={form.control}
                        name='identifier'
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState?.invalid}
                            >
                                <FieldLabel>
                                    Username or Email Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        {...field}
                                        type='text'
                                        aria-invalid={fieldState.invalid}
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
                                <FieldLabel>
                                    Password
                                </FieldLabel>
                                <FieldContent className='relative' >
                                    <Input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        aria-invalid={fieldState.invalid}
                                    />
                                </FieldContent>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className='flex items-center justify-end'>
                        <NavLink className='underline'>Forget your password</NavLink>
                    </div>

                    <Button className='w-full py-5 rounded-full bg-indigo-500 hover:bg-indigo-600'>
                        Log in
                    </Button>
                </form>
            </div>

            <div className='grid grid-cols-7 items-center  text-neutral-300 px-4 mt-6'>
                <hr className='h-0.5 border-none bg-neutral-200 col-span-3' />
                <div className=' text-center text-sm font-medium col-span-1'>OR</div>
                <hr className='h-0.5 border-none bg-neutral-200 col-span-3' />
            </div>

            <div className='grid grid-cols-2 gap-4 mt-6'>
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