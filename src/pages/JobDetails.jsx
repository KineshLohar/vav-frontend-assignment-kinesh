import { Briefcase, CalendarDays, Clock, GraduationCap, Layers, Map, Trash2 } from 'lucide-react'
import { NavLink, useNavigate, useParams } from 'react-router'
import DeleteConfirmDialog from '../components/DeleteConfirmModal'
import { Button } from '../components/ui/button'
import { useJobsStore } from '../store/jobs.store'
import toast from 'react-hot-toast'

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { jobs, deleteJob } = useJobsStore();
    const job = jobs.find(j => j.id === Number(id))

    const handleDeleteJob = (id) => {
        deleteJob(id);
        toast.success("Job Deleted!");
        navigate(-1)
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
      
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        });
      };

    return (
        <>
            <div className=" space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium text-neutral-600">
                        Job Details
                    </h2>
                    <div className='flex items-center gap-2'>
                        <DeleteConfirmDialog
                            trigger={
                                <Button className="bg-transparent hover:bg-neutral-50">
                                    <Trash2 size={24} className='text-red-500' />
                                </Button>
                            }
                            onConfirm={() => handleDeleteJob(id)}
                        />
                        {/* <Button onClick={() => setShowDeleteModal(true)} className="bg-transparent hover:bg-neutral-50">
                            <Trash2 size={24} className='text-red-500' />
                        </Button> */}
                        <NavLink to={`/jobs/${id}/edit`}>
                            <Button type="submit" form="job-form" className="bg-indigo-500 rounded-full px-6 py-4 text-sm text-neutral-50">
                                Edit Job
                            </Button>
                        </NavLink>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div>
                        <h3 className='text-neutral-500 font-medium'>{job.title}</h3>
                        <p className='text-neutral-500 text-sm mt-4'>
                            {job.description}
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='grid grid-cols-2 border p-4 rounded-lg text-center'>
                            <div className='flex flex-col items-center justify-center border-r'>
                                <p className='text-sm text-neutral-500'>Salary (USD)</p>
                                <p className='text-green-500'>${job.minSalary} - ${job.maxSalary}</p>
                                <p className='text-xs text-neutral-400'>Yearly salary</p>
                            </div>
                            <div className='flex flex-col items-center justify-center border-l'>
                                <Map className='text-indigo-400' />
                                <p className='text-xs text-neutral-400'>Job Location</p>
                                <p>{job.city}, {job.country}</p>
                            </div>
                        </div>
                        <div className='p-4 border rounded-lg'>
                            <h4>Job Overview</h4>
                            <div className='grid grid-cols-3 gap-2'>
                                <SmallCard
                                    icon={CalendarDays}
                                    label="Job Posted"
                                    value={formatDate(job.createdAt)}
                                />
                                <SmallCard
                                    icon={Clock}
                                    label="Job Expired on"
                                    value={formatDate(job.expiryDate)}
                                />
                                <SmallCard
                                    icon={Layers}
                                    label="Job Level"
                                    value={job.jobLevel}
                                />
                                <SmallCard
                                    icon={Briefcase}
                                    label="Experience"
                                    value={job.experienceLevel}
                                />
                                <SmallCard
                                    icon={GraduationCap}
                                    label="Education"
                                    value={job.educationLevel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const SmallCard = ({ icon, label, value }) => {
    const Icon = icon;
    return (
        <div className='flex flex-col py-3 gap-1'>
            <Icon size={20} className='text-indigo-400' />
            <p className='text-xs text-neutral-400'>{label}</p>
            <p className='text-sm text-neutral-600 font-medium capitalize'>{value}</p>
        </div>
    )
}

export default JobDetails