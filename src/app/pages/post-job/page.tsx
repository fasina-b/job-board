'use client'
import PostJobForm, { PostJobSchema } from "@/components/form/PostJobForm";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';


const PostJob = () => {
  const router = useRouter();
  const post_job = async (values: z.infer<typeof PostJobSchema>) => {
    try {
      const response = await fetch('/api/post-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          salary: values.salary,
          company: values.company,
          description: values.description,
          job_type: values.job_type,
          experience: values.experience,
          job_area: values.job_area,
        }),
      });
      if (response.ok) {
        console.log('Job Posted Sucessfully');
        router.push('/');
      } else {
        console.error('Job Posting failed');
      }
    } catch (error) {
      console.error('Error during job posting:', error);
    }
  }

  return (
    <div>
      <PostJobForm post_job={post_job}></PostJobForm>
    </div>
  );
};
export default PostJob;