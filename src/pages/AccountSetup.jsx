import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/auth.store'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import 'react-phone-input-2/lib/style.css';

import { Field, FieldContent, FieldError, FieldLabel } from '../components/ui/field';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import LogoUpload from '../components/LogoUpload';
import ReactPhoneInput from 'react-phone-input-2';
import { useUsersStore } from '../store/users.store';
import { CheckCheck } from 'lucide-react';
import { Navigate, NavLink } from 'react-router';

const setupSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    organizationType: z.string().min(1, "Select organization type"),
    industryType: z.string().min(1, "Select industry type"),
    teamSize: z.string().min(1, "Select team size"),
    yearOfEst: z.string()
        .refine((val) => /^\d{4}$/.test(val), "Enter valid year")
        .refine((val) => Number(val) <= new Date().getFullYear(), "Year cannot be future"),
    about: z.string().min(10, "Tell something about your company"),
    location: z.string().min(2, "Location is required"),
    contact: z.string().min(6, "Enter valid phone number"),
    companyEmail: z.string().email("Enter valid company email")
});

const PhoneInput = ReactPhoneInput.default ? ReactPhoneInput.default : ReactPhoneInput

const AccountSetup = () => {
    const { user, login } = useAuthStore();
    const { updateUser } = useUsersStore();

    const [setupCompleted, setSetupCompleted] = useState(false);

    const form = useForm({
        resolver: zodResolver(setupSchema),
        defaultValues: {
            companyName: "",
            organizationType: "",
            industryType: "",
            teamSize: "",
            yearOfEst: "",
            about: "",
            location: "",
            contact: "",
            companyEmail: ""
        }
    });

    const onSubmit = async (values) => {

        const updatedUser = {
            ...user,
            ...values,
            setupCompleted: true
        }
        await updateUser(updatedUser)
        await login(updatedUser)
        console.log(values);

        setSetupCompleted(true);
        // form.reset();
    };

    if(user?.setupCompleted) return <Navigate to="/dashboard" replace />

    return (
        <div className='relative'>

            {!setupCompleted && <div className='relative z-0 flex flex-col justify-center max-w-5xl mx-auto pb-16'>
                <h1 className='text-2xl font-medium text-neutral-600'>Account Setup</h1>
                <div className='mt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    <LogoUpload />
                </div>
                <h2 className=" font-semibold text-gray-800 my-4 ">Company Info</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Controller
                            control={form.control}
                            name='companyName'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="text-neutral-500 tracking-wider font-normal" >
                                    <FieldLabel>Company Name</FieldLabel>
                                    <FieldContent>
                                        <Input {...field} className='h-10' />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Organization Type */}
                        <Controller
                            control={form.control}
                            name='organizationType'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal" >Organization Type</FieldLabel>
                                    <FieldContent className="text-neutral-500" >
                                        <select {...field} className='h-10 w-full border rounded-md px-2'>
                                            <option value="">Select</option>
                                            <option value="startup">Startup</option>
                                            <option value="corporate">Corporate</option>
                                            <option value="agency">Agency</option>
                                        </select>
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Industry Type */}
                        <Controller
                            control={form.control}
                            name='industryType'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">Industry Type</FieldLabel>
                                    <FieldContent className="text-neutral-500">
                                        <select {...field} className='h-10 w-full border rounded-md px-2'>
                                            <option value="">Select</option>
                                            <option value="it">IT</option>
                                            <option value="finance">Finance</option>
                                            <option value="healthcare">Healthcare</option>
                                        </select>
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Team Size */}
                        <Controller
                            control={form.control}
                            name='teamSize'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">Team Size</FieldLabel>
                                    <FieldContent className="text-neutral-500">
                                        <select {...field} className='h-10 w-full border rounded-md px-2'>
                                            <option value="">Select</option>
                                            <option value="1-10">1-10</option>
                                            <option value="11-50">11-50</option>
                                            <option value="51-200">51-200</option>
                                            <option value="200+">200+</option>
                                        </select>
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Year */}
                        <Controller
                            control={form.control}
                            name='yearOfEst'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">Year of Establishment</FieldLabel>
                                    <FieldContent>
                                        <Input {...field} className='h-10' />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>

                    <Controller
                        control={form.control}
                        name='about'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="text-neutral-500 tracking-wider font-normal">About</FieldLabel>
                                <FieldContent>
                                    <textarea {...field} className='w-full border rounded-md p-2' />
                                </FieldContent>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <h2 className=" font-semibold text-gray-800 my-4 ">Contact Info</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Controller
                            control={form.control}
                            name='location'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">Location</FieldLabel>
                                    <FieldContent>
                                        <Input {...field} className='h-10' />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name='contact'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Contact Number</FieldLabel>
                                    <FieldContent>
                                        <PhoneInput
                                            country={'in'}
                                            value={field.value}
                                            onChange={field.onChange}
                                            inputClass="!h-10 !w-full !rounded-lg"
                                            containerClass="!w-full h-10 !rounded-lg "
                                        />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name='companyEmail'
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-neutral-500 tracking-wider font-normal">Company Email</FieldLabel>
                                    <FieldContent>
                                        <Input {...field} className='h-10' />
                                    </FieldContent>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <Button className='px-10 py-5 rounded-full bg-indigo-500 hover:bg-indigo-600 mt-4'>
                        Finish setup
                    </Button>
                </form>
            </div>}

            {
                setupCompleted &&
                <div className='  z-50 top-0 h-[calc(100vh-160px)] bg-white w-full flex flex-col items-center justify-center gap-4'>
                    <div className='p-5 bg-indigo-100 rounded-full text-indigo-400'>
                        <CheckCheck size={26} />
                    </div>
                    <h3 className='font-medium text-xl text-neutral-600'>🎉Congratulations, Your profile is 100% complete!</h3>
                    <div className='flex items-center justify-stretch gap-3'>
                        <NavLink to='/dashboard'>
                            <Button
                                className="px-9 rounded-full py-5 bg-indigo-200/60 text-indigo-500 font-medium "
                            >
                                View Dashboard
                            </Button>
                        </NavLink>
                        <NavLink to='/post-job'>
                            <Button
                                className="px-9 rounded-full py-5 bg-indigo-600/80 text-indigo-50 font-medium "
                            >
                                Post a Job
                            </Button>
                        </NavLink>

                    </div>
                </div>
            }
        </div>
    )
}

export default AccountSetup;