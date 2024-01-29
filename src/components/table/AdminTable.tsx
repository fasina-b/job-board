
import React from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  job_area: string;
  salary: string;
}

interface JobsTableProps {
  jobs: Job[];
  onDelete: (jobId: any) => void;

}

const JobsTable: React.FC<JobsTableProps> = ({ jobs, onDelete }) => {

  


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Job Area
            </th>
            <th scope="col" className="px-6 py-3">
              Salary
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {job.title}
              </td>
              <td className="px-6 py-4">{job.company}</td>
              <td className="px-6 py-4">{job.job_area}</td>
              <td className="px-6 py-4">{job.salary}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(job.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
