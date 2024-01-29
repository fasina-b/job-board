'use client'
import { useEffect, useState } from 'react';
import JobCard from '@/components/card'; // Import your JobCard component
import { useRouter } from 'next/navigation';

const ExploreJobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  const fetch_jobs = async () => {
    try {
      const response = await fetch('/api/explore-jobs');
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

  useEffect(() => {
    fetch_jobs();
  }, []);

  return (
    <div>
      <div>
        {jobs.map((job) => (
          <JobCard key={job} job={job} />
        ))}
      </div>
    </div>
  );
};

export default ExploreJobs;
