import { BriefcaseBusiness, IdCard } from 'lucide-react'
import { cn } from '../lib/utils'
import React from 'react'
import PostedJobs from '../components/PostedJobs'

const Dashboard = () => {
  return (
    <div className='min-h-[calc(100vh-120px)] w-full'>
      <h3 className='font-medium text-2xl'>Hello, Designic</h3>
      <p className='text-neutral-500 mb-4'>Here is your daily activity and applications</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4'>
        <Card count={10} label='Open Jobs' className="bg-indigo-50" icon={BriefcaseBusiness} />
        <Card count={200} label='Saved Candidates' className="bg-rose-50" icon={IdCard} />
      </div>
      
      <PostedJobs />
    </div>
  )
}

const Card = ({ className, icon, count, label }) => {
  const Icon = icon;
  return (
    <div className={cn('flex items-center justify-between gap-2 p-4 py-4.5 bg-neutral-50 rounded-lg', className)}>
      <div>
        <p>{count}</p>
        <p className='text-neutral-700 text-sm'>{label}</p>
      </div>
      <div className='p-3 bg-white rounded'>
        {Icon && <Icon size={20} className='text-neutral-500' />}
      </div>
    </div>
  )
}

export default Dashboard