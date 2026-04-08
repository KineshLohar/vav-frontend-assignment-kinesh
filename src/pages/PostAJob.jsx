import { useJobsStore } from '../store/jobs.store'
import JobForm from '../components/JobForm'
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const PostAJob = () => {
  const navigate = useNavigate();
  const { addJob } = useJobsStore();

  const handleAddJob = (job) => {
    addJob(job);
    toast.success("Job added successfully!");
    navigate(-1)
  }
  return (
    <JobForm type='add' onSubmitHandler={handleAddJob} />
  )
}

export default PostAJob