import React from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  job_area: string;
  description: string;
  salary: string;
  experience: string;
  dateCreated: string;
  job_type: string;
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const companyInitial = job.company.charAt(0).toUpperCase();
  const circleColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;

  return (
    <div key={job.id} className="group mx-3 mt-10 grid max-w-4xl grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
      <div className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-6">
        <div style={{ backgroundColor: circleColor }} className="group relative h-16 w-16 overflow-hidden rounded-full text-white flex items-center justify-center">
          <span className="text-xl font-bold">{companyInitial}</span>
        </div>
      </div>
      <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
        <h3 className="text-sm text-gray-600">{job.company}</h3>
        <a href="#" className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{job.title}</a>
        <p className="overflow-hidden pr-7 text-sm">{job.description}</p>
        <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="">Experience:<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{job.experience}</span></div>
          <div className="">Salary:<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.salary}</span></div>
          <div className="">Location:<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{job.job_area}</span></div>
          <div className="">Job Type:<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.job_type}</span></div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
