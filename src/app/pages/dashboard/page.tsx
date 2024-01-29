'use client'
import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { CustomUser } from '@/lib/types';
import AdminTable from '@/components/table/AdminTable';

export default function Dashboard() {
  const { data: session } = useSession();
  const user: CustomUser | undefined = session?.user;
  const [jobs, setJobs] = useState([]);

  const fetchPostedJobs = async () => {
    try {
      const response = await fetch('/api/fetch-posted-jobs');
      if (response.ok) {
        const data = await response.json();
        // Assuming the data structure is { jobs: [...] }
        setJobs(data.jobs || []);
      } else {
        console.error('Error fetching jobs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDelete = async (jobId: string) => {
    const id = jobId;
    console.log('Deleting job with ID:', id); // Add this line for debugging
    try {
      const response = await fetch(`/api/delete-job?id=${id}`, { // Change the endpoint to delete-job
        method: 'DELETE',
        
      });
      console.log('job with ID:', response); // Add this line for debugging

      if (response.ok) {
        // Refresh the jobs after successful deletion
        fetchPostedJobs();
      } else {
        console.error('Error deleting job:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  useEffect(() => {
    // Fetch jobs when the component mounts
    fetchPostedJobs();
  }, []); // Empty dependency array to ensure it only runs once on mount

  if (user?.role !== 'admin') {
    return (
      <section className="grid h-screen place-items-center">
        <div className="w-25">
          <p>You do not have permission to view this page!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-1">
      <AdminTable jobs={jobs} onDelete={handleDelete}></AdminTable>
    </section>
  );
}
