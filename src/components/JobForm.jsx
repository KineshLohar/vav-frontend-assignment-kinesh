import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldError,
} from "../components/ui/field";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { useAuthStore } from "../store/auth.store";


// ✅ Zod Schema
const jobSchema = z.object({
    title: z.string().min(2, "Job title is required"),
    role: z.string().min(1, "Select role"),
    tags: z.string().optional(),

    minSalary: z.coerce.number().min(0),
    maxSalary: z.coerce.number().min(0),
    salaryType: z.string().min(1, "Select salary type"),

    educationLevel: z.string().min(1, "Select education"),
    experienceLevel: z.string().min(1, "Select experience"),
    jobType: z.string().min(1, "Select job type"),
    jobLevel: z.string().optional(),

    expiryDate: z.string().min(1, "Select expiry date"),

    country: z.string().min(1, "Select country"),
    city: z.string().min(1, "Select city"),

    description: z.string().min(20, "Add job description"),
    fullyRemote: z.boolean(),
});

const JobForm = ({ job = null, type = "add", onSubmitHandler }) => {
    const { user } = useAuthStore();
    const form = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: job?.title || "",
            role: job?.role || "",
            tags: job?.tags || "",

            minSalary: job?.minSalary || 0,
            maxSalary: job?.maxSalary || 0,
            salaryType: job?.salaryType || "",

            educationLevel: job?.educationLevel || "",
            experienceLevel: job?.experienceLevel || "",
            jobType: job?.jobType || "",
            jobLevel: job?.jobLevel || "",

            expiryDate: job?.expiryDate || "",

            country: job?.country || "",
            city: job?.city || "",

            description: job?.description || "",
            fullyRemote: job?.fullyRemote || false,
        },
    });

    const onSubmit = (values) => {
        if (type === "edit") {
            onSubmitHandler({ ...job, ...values, id: job.id }); // update
        } else {
            onSubmitHandler({ ...values, createdById: user?.id }); // create
        }
    };

    return (
        <div className=" mx-auto space-y-6">

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    {type === "edit" ? "Edit Job Details" : "Post Job"}
                </h2>

                <Button type="submit" form="job-form" className="bg-indigo-500 rounded-full px-6 py-4 text-sm text-neutral-50">
                    {type === "edit" ? "Update Job" : "Post Job"}
                </Button>
            </div>

            <form
                id="job-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

                {/* BASIC INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Job Title</FieldLabel>
                                <FieldContent>
                                    <Input {...field} className='h-10' />
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                    <Controller
                        name="tags"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Tags</FieldLabel>
                                <FieldContent>
                                    <Input {...field} className='h-10' />
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <Controller
                        name="role"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Job Role</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Select</option>
                                        <option value="developer">Developer</option>
                                        <option value="designer">Designer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                </div>
                <h2 className=" font-medium text-gray-600 my-4 ">Salary</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Controller
                        name="minSalary"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Min Salary</FieldLabel>
                                <FieldContent>
                                    <Input {...field} type="number" placeholder="Min Salary" className='h-10' />
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <Controller
                        name="maxSalary"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Max Salary</FieldLabel>
                                <FieldContent>
                                    <Input {...field} type="number" placeholder="Max Salary" className='h-10' />
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />

                    {/* Salary Type */}
                    <Controller
                        name="salaryType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Salary Type</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Salary Type</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="hourly">Hourly</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />
                </div>
                <h2 className=" font-medium text-gray-600 my-4 ">Advance Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Controller
                        name="educationLevel"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Education Level</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Education</option>
                                        <option value="highschool">High School</option>
                                        <option value="bachelors">Bachelors</option>
                                        <option value="masters">Masters</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />

                    <Controller
                        name="experienceLevel"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Experience Level</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Experience</option>
                                        <option value="fresher">Fresher</option>
                                        <option value="mid">Mid</option>
                                        <option value="senior">Senior</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <Controller
                        name="jobType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Job Type</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Job Type</option>
                                        <option value="fulltime">Full Time</option>
                                        <option value="parttime">Part Time</option>
                                        <option value="contract">Contract</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />
                    <Controller
                        name="jobLevel"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm" >
                                <FieldLabel className="text-neutral-400">Job Level</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Job Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />
                    <Controller
                        name="expiryDate"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Max Salary</FieldLabel>
                                <FieldContent>
                                    <Input {...field} type="date" className='h-10' />
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />
                </div>
                <h2 className=" font-medium text-gray-600 my-4 ">Advance Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Controller
                        name="country"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Country</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">Country</option>
                                        <option value="india">India</option>
                                        <option value="usa">USA</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>

                        )}
                    />

                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                                <FieldLabel className="text-neutral-400">Country</FieldLabel>
                                <FieldContent>
                                    <select {...field} className='h-10 w-full border rounded-md px-2'>
                                        <option value="">City</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="delhi">Delhi</option>
                                    </select>
                                </FieldContent>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />


                </div>

                {/* REMOTE */}
                <Controller
                    name="fullyRemote"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                            <FieldContent>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <span>Fully remote position</span>
                                </div>
                            </FieldContent>
                            <FieldError errors={[fieldState.error]} />
                        </Field>

                    )}
                />

                {/* DESCRIPTION */}
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="text-neutral-600 tracking-wider font-normal text-sm">
                            <FieldLabel className="text-neutral-400">Job Description</FieldLabel>
                            <FieldContent>
                                <Textarea {...field} rows={12} className='min-h-40' />
                            </FieldContent>
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />

            </form>
        </div>
    );
};

export default JobForm;