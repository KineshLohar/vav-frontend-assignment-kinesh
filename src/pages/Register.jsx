
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';
import z from 'zod';
import { Button } from '../components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '../components/ui/field';
import { Input } from '../components/ui/input';
import { useUsersStore } from '../store/users.store';
import { useAuthStore } from '../store/auth.store';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-z0-9_]{3,20}$/;

const contactSchema = z.object({
    fullName: z.string().min(3, "Full name is required!"),
    username: z.string()
        .min(3, "Username must be of atleast 3 characters")
        .transform((val) => val.toLowerCase())
        .refine((v) => usernameRegex.test(v), "Enter a valid username"),
    email: z.string()
        .refine((v) => emailRegex.test(v), "Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

const Register = () => {
    const { users, addUser } = useUsersStore();
    const { login } = useAuthStore();

    const navigate = useNavigate();
    const [showPassword, setShowpassword] = useState(false);
    const [showConfirmPassword, setShowConfirmpassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (values) => {
        const existingUser = users?.find(u => values.identifier.toLowerCase() === u.email.toLowerCase || values.identifier.toLowerCase() === u.username.toLowerCase());
        
        if(existingUser){
            toast.error("User with this email or username already exists!")
            return
        }

        const user = {
            id: users.length,
            ...values
        };

        await addUser(user);
        await login(user);

        navigate('/account-setup');

    };

    return (
        <div className='max-w-lg mx-auto flex flex-col justify-center pt-8 pb-16'>
            <h1 className='text-2xl font-medium text-neutral-600'>Welcome to JobPilot</h1>
            <p className='text-neutral-600'>Already have an account? <span className='underline'><NavLink to='/login'>Log In</NavLink></span></p>
            <div className='mt-8'>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Controller
                            control={form.control}
                            name='fullName'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState?.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">
                                        Full Name
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input {...field} type='text' aria-invalid={fieldState.invalid} className='h-10' />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name='username'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState?.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">
                                        Username
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input {...field} onChange={(e) => field.onChange(e.target.value.toLowerCase())} type='text' aria-invalid={fieldState.invalid} className='h-10' />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <Controller
                        control={form.control}
                        name='email'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState?.invalid}>
                                <FieldLabel className="text-neutral-500 tracking-wider font-normal">
                                    Email Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input {...field} type='text' aria-invalid={fieldState.invalid} className='h-10' />
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
                    <Controller
                        control={form.control}
                        name='confirmPassword'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState?.invalid}>
                                <FieldLabel className="text-neutral-500 tracking-wider font-normal">
                                    Confirm Password
                                </FieldLabel>
                                <FieldContent className='relative'>
                                    <Input
                                        {...field}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        aria-invalid={fieldState.invalid}
                                        className='h-10 text-neutral-700'
                                    />
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowConfirmpassword((prev) => !prev)
                                        }}
                                        className='text-neutral-600 absolute right-2 top-2.5 cursor-pointer'
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </FieldContent>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className=' text-sm text-neutral-600'>
                        By creating an account, you agree to the <span className='underline'><NavLink to="#" >Terms of use</NavLink></span> and <span className='underline'><NavLink to="#" >Privay Policy</NavLink></span>.
                    </div>

                    <Button className='w-full py-5 rounded-full bg-indigo-500 hover:bg-indigo-600 mt-6'>
                        Sign up
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
                    Sign up with Facebook
                </button>
                <button
                    type='button'
                    className='py-3 rounded-full border border-neutral-300 text-neutral-600'
                >
                    Sign up with Google
                </button>
            </div>
        </div>
    )
}

export default Register