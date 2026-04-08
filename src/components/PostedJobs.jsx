import { CheckCircle, EllipsisVertical, ShieldAlert, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { getJobStatus } from '../lib/utils';
import { useJobsStore } from '../store/jobs.store';
import { Table, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const PostedJobs = ({ type }) => {
  const { jobs } = useJobsStore();

  console.log("JOBS", jobs);


  const showRecently = type === 'recent';

  return (
    <div className='w-full py-3'>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='font-medium text-neutral-600'>{showRecently ? 'Recently Posted Jobs' : 'My Jobs'}</h4>
        {showRecently && <NavLink to="/jobs" className='text-neutral-400' >View all</NavLink>}
      </div>

      <Table className="overflow-scroll">
        <TableHeader className='bg-slate-100  ' >
          <TableHead className='min-w-32 rounded-tl-lg rounded-bl-lg text-neutral-500'>Jobs</TableHead>
          <TableHead className='text-neutral-500'>Status</TableHead>
          <TableHead className='text-neutral-500'>Applications</TableHead>
          <TableHead className='min-w-32 rounded-tr-lg rounded-br-lg text-neutral-500'>Actions</TableHead>
        </TableHeader>
        {
          jobs?.length > 0 && jobs?.map((job) => {
            const { status, daysRemaining } = getJobStatus(job.expiryDate);
            return (
              <TableRow key={job.id} className='overflow-x-auto'>
                <TableCell>
                  <div className='flex flex-col gap-1 py-1'>
                    <p className='font-medium text-neutral-700'>{job.title}</p>
                    <div className='flex items-center gap-4 text-neutral-500 text-xs'>
                      <p>{job.jobType}</p>
                      <div className='h-1 w-1 bg-neutral-400 rounded-full mt-1'></div>
                      <p>
                        {status === "expired"
                          ? "Expired"
                          : `${daysRemaining} days remaining`}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-60">
                  {
                    status === 'active' ?
                      <div className='flex items-center gap-2 font-medium text-green-500'>
                        <CheckCircle size={22} /> Active
                      </div>
                      :
                      <div className='flex items-center gap-2 text-rose-500 font-medium'>
                        <ShieldAlert size={22} /> Expired
                      </div>
                  }
                </TableCell>
                <TableCell className="text-sm text-neutral-500">
                  <div className='flex items-center gap-3'>
                    <Users size={18} className='text-neutral-500' /> {job.applications} Applications
                  </div>
                </TableCell>
                <TableCell className='w-52'>
                  <div className='flex items-center gap-3'>
                    <NavLink to={`/jobs/${job.id}`} className='text-sm px-5 py-2 rounded-full font-medium text-indigo-500 bg-indigo-50' >View Job</NavLink>
                    <EllipsisVertical />
                  </div>
                </TableCell>
              </TableRow>)
          })
        }
      </Table>
    </div>
  )
}

export default PostedJobs