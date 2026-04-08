import { useAuthStore } from '../store/auth.store';
import JobForm from '../components/JobForm';
import { useJobsStore } from '../store/jobs.store';
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    
    const { updateJob, jobs } = useJobsStore();
    const { user } = useAuthStore();

    const handleJobUpdate = (job) => {
        console.log("Job", job);
        
        updateJob(job);
        toast.success("Job detailed updated!")
        navigate(-1)
    }

    const jobToEdit = jobs?.find((j) => j.id === Number(id) && user.id === j.createdById);
    return (
        <JobForm type='edit' job={jobToEdit} onSubmitHandler={handleJobUpdate} />
    )
}

export default EditJob